const User = require('../models/User');
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    var user;
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
            jwt.sign({user}, 'secretkey', {expiresIn: '32s'}, (err, token) => {
                res.json({
                    token
                });
            });

        } else {
            res.json({"message": "contraseña incorrecta"});
        }
    }else{
        res.json({"message": "Usuario o correo incorrecto"});
    }
}

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}