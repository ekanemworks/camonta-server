const mysql = require('mysql');
const express = require('express');
var app = express();
var bodyparser = require('body-parser');
// const count = require('../../nodeapp/mymodule/count');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');
const date = require('date-and-time');
const multer = require('multer');
var formidable = require('formidable');
const fs = require('fs');
const mime = require('mime');

// DATABASE CONNECTION
var DATABASE_CONNECTION = require('./dbConnection')
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);


app.use(require('./ApiRoutes'));
app.use(bodyparser.json({limit:"100mb"}));


var cors = require('cors'); 
app.use(cors()); 

app.use('/profilephotos', express.static(__dirname + '/profilephotos'));
app.use('/productphotos', express.static(__dirname + '/productphotos'));
app.use('/photo_categories', express.static(__dirname + '/photo_categories'));
app.use('/promotionadsphoto', express.static(__dirname + '/promotionadsphoto'));


// MAINLY FOR CHAT SOCKET IO REALTIME
// const express = require('express');
const appp = express();
const server=require('http').createServer(appp);
io = require('socket.io')(server, {
    upgradeTimeout: 50000,
  cors:{
      origin:"*"
  },
});


var clients = {};

io.on('connection', (socket) => { 
    // console.log(socket.id);
    console.log(socket.id+' joinned the chat server');


    socket.on('signin',(id)=>{
        console.log(id);
        clients[id]=socket;
        // console.log(clients);
    });

    socket.on('disconnect',()=>{
        console.log("Disconnected", socket.id);
    });

    socket.on('message',(msg)=>{
        console.log(msg);
        let targetId = msg.baybnTargetId;

        // TO ONLY EMIT IF RECIEVER IS KNOWN
        if (clients[targetId]) {
            clients[targetId].emit('message-received', msg);
        }
        // socket.broadcast.emit('message-receive',data);
    });

});






mysqlConnectionfidsbay.connect((err) => {
    if (!err) {
        console.log('Database Connected');
        console.log('...');
    }else{
        console.log(err)
        console.log('Error dey o: Db not connecting to node server');
    }
});


// app.listen(3000, () => console.log('App Server Running'));

// RUN ON LOCAL MACHINE
// app.listen(3000, '192.168.0.126', ()=> console.log("App server running on IP")); // COUSANT WIFI
// app.listen(3000, '192.168.8.197', ()=> console.log("App server running on IP")); // COMPOSITE WIFI
app.listen(3000, ()=> console.log("App server running on IP")); // WITHOUT WIFI








app.get('/',(req,res) => {
    res.send('The App')
})



