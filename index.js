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
        console.log('Database Connected To Server');
        console.log('...');
    }else{
        console.log(err)
        console.log('Database not connected to server');
    }
});


// app.listen(3000, () => console.log('App Server Running'));

// RUN ON LOCAL MACHINE
// app.listen(3000, '192.168.0.126', ()=> console.log("App server running on IP")); // COUSANT WIFI
// app.listen(3000, '192.168.8.197', ()=> console.log("App server running on IP")); // COMPOSITE WIFI
// app.listen(3000, '192.168.43.170', ()=> console.log("App server running on IP")); // CAMONTA WIFI
app.listen(3000, ()=> console.log("Main server running on localhost")); // WITHOUT WIFI








app.get('/',(req,res) => {
    res.send('Camonta Server')
})



// FOR UPDATE PROFILE PHOTO
// FOR UPDATE PROFILE PHOTO
// FOR UPDATE PROFILE PHOTO
// FOR UPDATE PROFILE PHOTO
// FOR UPDATE PROFILE PHOTO
app.post('/updateProfilePhoto', (req, res) => {
    var base64ImageVariable =  req.body.image;
    var userid = req.body.userid;
    var randomvariable = uuidv4();
    randomvariable = randomvariable.substr(0,4);
    var imagePathOnDB = '';
 
 
 
             // function to decode base64
             // function to decode base64
             function decodeBase64Image(dataString) {
                 // var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
                 // response = {};
             
                 // if (matches.length !== 3) {
                 // return new Error('Invalid input string');
                 // }
             
                 // response.type = matches[1];
                 response = new Buffer.from(dataString, 'base64');
             
                 return response;
             }
             // end of function to decode base64
             // end of function to decode base64
 
         var decodedImg = decodeBase64Image(base64ImageVariable);
         var imageBuffer = decodedImg;
         
 
             
  
                     var curr_img_a = __dirname+'/profilephotos'+'/'+ 'user_'+userid+'_CODE_A.jpg';
                     var curr_img_b = __dirname+'/profilephotos'+'/'+ 'user_'+userid+'_CODE_B.jpg';
     
                     if (fs.existsSync(curr_img_a)) {
                   
                         fs.unlinkSync(curr_img_a);
                         fs.writeFileSync(curr_img_b, imageBuffer, 'utf8');
                         imagePathOnDB = 'profilephotos'+'/'+ 'user_'+userid+'_CODE_B.jpg';
                        
                     }else if(fs.existsSync(curr_img_b)){
                         
                         fs.unlinkSync(curr_img_b);
                         fs.writeFileSync(curr_img_a, imageBuffer, 'utf8');
                         imagePathOnDB = 'profilephotos'+'/'+ 'user_'+userid+'_CODE_A.jpg';
 
                     }else{
                         fs.writeFileSync(curr_img_a, imageBuffer, 'utf8');
                         imagePathOnDB = 'profilephotos'+'/'+ 'user_'+userid+'_CODE_A.jpg';
                     }
 
 
 
                     mysqlConnectionfidsbay.query("UPDATE members SET profilephoto = ? WHERE id = ?",[imagePathOnDB,userid],function (err,rows,fields) {
 
                         if (!err) {
                             
                             res.send({
                                 status: 'ok',
                                 body: {imagePathOnDB: imagePathOnDB},
                                 message: 'Update successfully'
                             })
 
                         }else{
                             console.log(err);
                             res.send({
                                 status: 'error',
                                 message: 'Database error!'
                             });
                         }
             
                     });
     
     
     
 
      
 
 
 }); //End of setup business profile photo
 
 


