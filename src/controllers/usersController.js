const User = require('../models/user');
const Role = require('../models/role');



exports.createUser = async (req, res) => {
    const { user, email, password, role, phone } = req.body;
    if (req.body.email == '') {
        res.json({ "message": "Email invalido" });
    } else if (req.body.password == '') {
        res.json({ "message": "Password invalido" });
    } else if (req.body.user == '') {
        res.json({ "message": "Usuario invalido" });
    } else {
        const newUser = new User({
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
    }
}

exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);

}

exports.updateUser = async (req, res) => {
    req.body.password = await User.encryptPassword(req.body.password)
    await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
    })
    res.status(204).json();
}

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).json();
}