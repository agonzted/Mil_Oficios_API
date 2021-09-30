const User = require('../models/user');
const Role = require('../models/role');
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password, method } = req.body;
    var user;
    switch (method) {
        case "normal":
            switch (Object.keys(req.body)[0]) {
                case "user":
                    user = await User.findOne({ "user": req.body[Object.keys(req.body)[0]]}).populate("roles");
                    break;
                case "email":
                    user = await User.findOne({ email }).populate("roles");
                    break;
                default:
                    break;
            }
            if (user !== null && typeof user !== 'undefined') {
                if (await User.comparePassword(password, user.password)) {
                    jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '180s' }, (err, token) => {
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
            if (user !== null && typeof user !== 'undefined') {
                jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '32s' }, (err, token) => {
                    res.json({
                        token
                    });
                });
            } else {
                var newUser;
                newUser = new User({
                    'user': req.body[Object.keys(req.body)[0]],
                    email,
                    password: await User.encryptPassword(password)
                });
                try {
                    const userSaved = await newUser.save();
                    jwt.sign({ id: userSaved._id }, process.env.SECRET, { expiresIn: '32s' }, (err, token) => {
                        res.json({
                            token
                        });
                    });
                } catch (error) {
                    res.json({ "message": "Error inesperado" });
                }
            }
            break;
        case "facebook":
            user = await User.findOne({ email });
            if (user !== null && typeof user !== 'undefined') {
                jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '180s' }, (err, token) => {
                    res.json({
                        token
                    });
                });
            } else {
                var newUser;
                newUser = new User({
                    'user': req.body[Object.keys(req.body)[0]],
                    email,
                    password: await User.encryptPassword(password)
                });
                try {
                    const userSaved = await newUser.save();
                    jwt.sign({ id: userSaved._id }, process.env.SECRET, { expiresIn: '32s' }, (err, token) => {
                        res.json({
                            token
                        });
                    });
                } catch (error) {
                    res.json({ "message": "Error inesperado" });
                }
            }
            break;
        default:
            break;

    }
}

exports.signup = async (req, res) => {
    const { user, email, password, confirmPassword, role, phone } = req.body;
    var newUser;
    if (req.body.email == '') {
        res.json({ "message": "Email invalido" });
    } else if (req.body.password == '') {
        res.json({ "message": "Password invalido" });
    } else if (req.body.user == '') {
        res.json({ "message": "Usuario invalido" });
    } else {
        if (password == confirmPassword) {
            newUser = new User({
                user,
                email,
                phone,
                password: await User.encryptPassword(password)
            });
            if(role){
                const foundRoles = await Role.find({name: {$in: role}})
                newUser.roles = foundRoles.map(role => role._id)
            }else{
                const preRoles = await Role.findOne({name: "Consumer"})
                newUser.roles = [preRoles._id]
            }
            try {
                const userSaved = await newUser.save();
                jwt.sign({ userSaved }, process.env.SECRET, { expiresIn: '180s' }, (err, token) => {
                    res.json({
                        token
                    });
                });
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
        } else {
            res.json({ "message": "Las contraseñas no coinciden" })
        }
    }
}