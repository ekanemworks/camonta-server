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
// app.listen(3000, '172.20.10.3', ()=> console.log("App server running on IP")); // IPHONE WIFI
app.listen(3000, '192.168.0.169', ()=> console.log("App server running on wifi IP")); // SpaceX WIFI
// app.listen(3000, '192.168.30.63', ()=> console.log("App server running on VALINNO IP")); // CAMONTA WIFI
// app.listen(3000, ()=> console.log("Main server running on localhost")); // WITHOUT WIFI








app.get('/',(req,res) => {
    res.send('Camonta Server')
})

app.get('/testboy',(req,res) => {
    var ourjson = {
        status: "ok",
        message: "successful"
    }
    res.send(ourjson)
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
 
 
 
                     mysqlConnectionfidsbay.query("UPDATE members SET profilePhoto = ? WHERE id = ?",[imagePathOnDB,userid],function (err,rows,fields) {
 
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

    }); //End 












    // UPLOAD PRODUCT PHOTO
    // UPLOAD PRODUCT PHOTO
    // UPLOAD PRODUCT PHOTO
    app.post('/uploadProductPhoto', (req, res) => {
        var base64ImageVariableList = JSON.parse(req.body.imageList);
        console.log(base64ImageVariableList.length+' images in this array');

        var productCode = req.body.productCode;
        var productOwnerid = req.body.productOwnerid;
        var myProductCount = req.body.myProductCount;

        var randomvariable = uuidv4();
        randomvariable = randomvariable.substr(0,4);
        var imagePathOnDB = '';
        var imageDirPathForDBList = [];
    
 
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

            // FOREACH LOOP TO ITRATE THROUGH ALL THE BASE64 IN THE LIST
            // FOREACH LOOP TO ITRATE THROUGH ALL THE BASE64 IN THE LIST
            base64ImageVariableList.forEach(base64ElementString => {
                // decodedImg = decodedImg+1
                var decodedImg = decodeBase64Image(base64ElementString);
                // console.log('inside foreach? yes');

                var imageBuffer = decodedImg;
                var productPhotoUserDir        = __dirname+'/productphotos'+'/'+ 'user_'+productOwnerid;
                var productPhotoUserProductDir = __dirname+'/productphotos'+'/'+ 'user_'+productOwnerid+'/'+'product_'+myProductCount;

                if (!fs.existsSync(productPhotoUserDir)){
                    // if it does not exist

                    // Creation of User Directory
                    fs.mkdirSync(productPhotoUserDir);
                }

                if (!fs.existsSync(productPhotoUserProductDir)){
                    // if it does not exist

                    // Creation of UserProduct Directory
                    fs.mkdirSync(productPhotoUserProductDir);
                }

                    // Creating a new name for File
                    var newnameVariable = uuidv4();
                    newnameVariable = newnameVariable.substring(0,7);
                    var newFilename = newnameVariable+'.jpg';

                    // The Directory/path where image is stored on server
                    var productPhotUserProductoDir_Path = __dirname+'/productphotos'+'/'+ 'user_'+productOwnerid+'/'+'product_'+myProductCount+'/'+newFilename;
                    imagePathOnDB='productphotos'+'/'+ 'user_'+productOwnerid+'/'+'product_'+myProductCount+'/'+newFilename;
                    try{
                        fs.writeFileSync(productPhotUserProductoDir_Path, imageBuffer, 'utf8');
                        // Contain the List/Array of Image path to be inserted in DB
                        imageDirPathForDBList.push(imagePathOnDB);
                     }
                    catch(err){
                        console.error(err)
                    }

                


            });
            // END: of foreach loop

            // console.log(imageDirPathForDBList);
            var imageDirPathForDBList_stringify = JSON.stringify(imageDirPathForDBList)

 
            mysqlConnectionfidsbay.query("UPDATE products SET productPhotos = ? WHERE productCode = ?",[imageDirPathForDBList_stringify,productCode],function (err,rows,fields) {
    
                if (!err) {
                                
                    res.send({
                        status: 'ok',
                        message: 'Upload successful'
                    })
    
                }else{
                    console.log(err);
                    res.send({
                        status: 'error',
                        message: 'Image upload error! Try later'
                    });
                }
             
            });
    }); 
    //End 
 
 


