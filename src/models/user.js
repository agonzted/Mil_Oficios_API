const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    user: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        unique: true
    },
    name:{
        type: String,
    },
    lastName:{
        type: String,
    },
    gender:{
        type: String,
    },
    birthday:{
        type: Date,
    },
    IDcard:{
        type: String,
    },
    proofAddress:{
        type: String,
    },
    photo:{
        type: String,
    },
    emergencyContact:{
        type: String,
    },
    aboutU:{
        type: String,
    },
    website:{
        type: String,
    },

    roles:[{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},
{
    timestamps: true,
    versionKey: false    
}
);


userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}



module.exports = model('User', userSchema)