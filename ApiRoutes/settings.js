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


const sql_check_password = "SELECT * FROM members WHERE password=? AND profileSession=?";
const sql_UPDATE_passsword = "UPDATE members SET password=? WHERE profileSession=?";





router.post('/changePassword', (req,res) => {
    console.log('stage 1');
    var currentPassword =  req.body.currentPassword;
    var newPassword =  req.body.newPassword;
    var profileSession = req.body.profileSession;

    currentPassword = md5(currentPassword);
    newPassword = md5(newPassword);


    // CHECK TO SEE IF CURRENT PASSWORD IS CORRECT
    // CHECK TO SEE IF CURRENT PASSWORD IS CORRECT
    // CHECK TO SEE IF CURRENT PASSWORD IS CORRECT
    try {
        mysqlConnectionfidsbay.query(sql_check_password,[currentPassword,profileSession],function (err,result,fields) {
            console.log('stage 2');

            console.log(result);
            // See if it returns a result, then it is correct
            if (result.length==1) {
                console.log('stage 3');


                // TO UPDATE THE PASSWORD
                // TO UPDATE THE PASSWORD
                try {
                    mysqlConnectionfidsbay.query(sql_UPDATE_passsword,[newPassword,profileSession],function (err,result,fields) {
                        // console.log('stage 4');

                        dataResponse = {
                            status: 'ok',
                            body: {newPassword: newPassword},
                            direction: 'editprofile',
                            message: 'Saved New Password'
                        }                    
                        res.send(dataResponse)

                        
                    });
                } catch (error) {
                    dataResponse = {
                        status: 'error',
                        // body: {newpassword: newpw},
                        // direction: 'editprofile',
                        message: 'Server Error'
                    }                    
                    res.send(dataResponse)
                }


            }else{
                dataResponse = {
                    status: 'error',
                    // body: {newpassword: newpw},
                    // direction: '',
                    message: 'You entered wrong values for Current Password'
                }                    
                res.send(dataResponse)
            }
            // End of condition check
            
        });

    } catch (error) {
        
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