const jwt = require("jsonwebtoken");
const Role = require("../models/role");
const User = require("../models/user");
require('dotenv').config();


exports.verifyToken = async (req, res, next) => {
    const token = req.headers["x-acces-token"];
    try {
        if (!token) return res.status(403).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "no user found" })
        

    } catch (error) {
        res.json(error)
    }
    next();
};

exports.isAdmin = async (req, res, next) => {
    const user = await User.findById(req.userId);
    const role = await Role.find({_id: {$in: user.roles}})

    for( let i = 0;i<role.length; i++){
        if(role[i].name==="Administrator"){
            next()
            return;
        }
        
    }
    return res.status(403).json({message:"Role admin required"})
};