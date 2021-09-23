  
const mongoose = require('mongoose');
require('dotenv').config();


async function connect(){
    const uri = 'mongodb+srv://gonzedAdmin:dsWTVsUQn65ggJktsRcl3UDCBW2SI31SfR34i5p3L2CC1sQLVs@miloficios.tefuc.mongodb.net/milOficios?retryWrites=true&w=majority';
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