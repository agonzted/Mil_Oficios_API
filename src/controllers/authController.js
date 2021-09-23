const User = require('../models/user');
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password, method } = req.body;
    var user;
    switch (method) {
        case "normal":
            switch (Object.keys(req.body)[0]) {
                case "user":
                    user = await User.findOne({ "user": req.body[Object.keys(req.body)[0]] });
                    break;
                case "email":
                    user = await User.findOne({ email });
                    break;
                default:
                    break;
            }
            if (user !== null && typeof user !== 'undefined') {
                if (await User.comparePassword(password, user.password)) {
                    jwt.sign({ user }, 'secretkey', { expiresIn: '32s' }, (err, token) => {
                        res.json({
                            token
                        });
                    });

                } else {
                    res.json({ "message": "contraseña incorrecta" });
                }
            } else {
                res.json({ "message": "Usuario o correo incorrecto" });
            }
            break;
        case "google":
            user = await User.findOne({ email });
            break;
        case "facebook":
            break;
        default:
            break;

    }
}

exports.signup = async (req, res) => {
    const { user, email, password, confirmPassword, method } = req.body;
    var newUser;
    if (password == confirmPassword) {
        switch (method) {
            case "normal":
                newUser = new User({
                    user,
                    email,
                    password: await User.encryptPassword(password)
                });
                try {
                    const userSaved = await newUser.save();
                    res.status(201).json(userSaved);
                } catch (error) {
                    switch (Object.keys(error.keyValue)[0]) {
                        case "user":
                            res.json({ "message": "Usuario no disponible" });
                            break;
                        case "email":
                            res.json({ "message": "Este correo ya esta en uso" });
                            break;
                        default:
                            res.json({ "message": "Error inesperado" });
                            break;
                    }
                }
                break;
            case "google":
                newUser = new User({
                    user,
                    email,
                    password: await User.encryptPassword(password)
                });
                break;
            case "facebook":
                break;
            default:
                break;
        }
    } else {
        res.json({ "message": "Las contraseñas no coinciden" })
    }

}