const { Schema, model} = require('mongoose');

const workSchema = new Schema(
    {
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    addres: {
        type: String,
    },
    users:[{
        ref: "User",
        type: Schema.Types.ObjectId
    }],
    },
    {
        versionKey: false,
    }
);

module.exports = model('Work', workSchema)