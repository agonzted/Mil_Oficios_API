const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('json spaces', 2);

//app.use('/api/movements',require('./routes/movements'));
app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));

app.get('/', (req,res)=>{
    res.json({"title": "Hello world"});
});


module.exports = app;