const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'image/' })

router.use(cors()); 
router.use(bodyparser.json());


const date = require('date-and-time');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');


// CUSTOM UI KEYS FOR EXTRA SECURITY FOR OUR RESOURCES/SERVERS
var CUSTOMKEYS = require('../customkeys');

// DATABASE CONNECTION
var DATABASE_CONNECTION = require('../dbConnection');
var mysqlConnectionfidsbay = (DATABASE_CONNECTION);


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'baybn.app@gmail.com',
        pass: 'lordkanem766imortal'
    }
});

router.use(cors()); 

        
        




    router.post('/Authenticate', (req,res) => {

        // SQL_STATEMENTS
        const sql_authentication = "SELECT * FROM members WHERE (profileEmail=? AND password=?)";

        var profileEmail = req.body.profileEmail;
        var password_encrypted = md5(req.body.password);

        var escape_login_data_list = [
            profileEmail,
            password_encrypted
        ]
        try {
            mysqlConnectionfidsbay.query(sql_authentication,escape_login_data_list,function (err,result1,fields) {
                if (result1.length == 1) {

                    dataResponse = {
                        status: 'ok',
                        body: result1[0],
                        direction: 'home',
                        message: 'Login successful'
                    }                    
                    // console.log(dataResponse);

                    res.send(dataResponse)

                }else{
                    dataResponse = {
                        status: 'error',
                        message: 'Wrong Email or Password'
                    }
                    // console.log(dataResponse);

                    res.send(dataResponse)
                }
              
            });

        } catch (error) {
            console.log(error);   
            dataResponse = {
                status: 'error',
                // body: {newpassword: newpw},
                // direction: 'editprofile',
                message: 'Server Error'
            }                    
            res.send(dataResponse)
        }

    });  



module.exports = router;