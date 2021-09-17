  
const mongoose = require('mongoose');
require('dotenv').config();


async function connect(){
    const uri = "mongodb+srv://"+process.env.USER+':'+process.env.PASSWORD+'@miloficios.tefuc.mongodb.net/'+process.env.DBNAME+'?retryWrites=true&w=majority';
    try {
        await mongoose.connect(uri, 
        {
            useNewUrlParser: true
        });
        console.log('Database: Connected');
    } catch (e) {
        console.log('Something went wrong!');
        console.log(e);
    }
};

module.exports = { connect };