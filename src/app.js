const { createRoles } = require('./libs/initiateSetUp')

createRoles();
const morgan = require('morgan');
const cors = require('cors');

const express = require("express");
var http = require("http");
const app = express();
var server = http.createServer(app);
var io = require("socket.io")(server);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('json spaces', 2);



//app.use('/api/movements',require('./routes/movements'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.json({ "title": "Hello world" });
});

io.on('connection', (socket) => {
  console.log('a user connected');
});


exports.appSock = app;
exports.serverSock = server;