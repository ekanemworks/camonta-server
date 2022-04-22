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

        
        




    router.post('/saveInformation', (req,res) => {

        // VALIDATING CUSTOM UI KEY FROM MOBILE APP
        // VALIDATING CUSTOM UI KEY FROM MOBILE APP
        // VALIDATING CUSTOM UI KEY FROM MOBILE APP
        if (req.headers.uikey == CUSTOMKEYS.uikey) {

            // SQL_STATEMENTS
            const sql_check_email = "SELECT * FROM members WHERE profileEmail = ? AND profileSession!= ?";
            const sql_check_username = "SELECT * FROM members WHERE profileUsername = ? AND profileSession!= ?";

            // CHECK EMAIL isn't used: QUERY
            try {
                mysqlConnectionfidsbay.query(sql_check_email,[req.body.profileEmail,req.body.profileSession],function (err,emailCheckResult,fields) {

                    // Confirm Email Statment
                    if (emailCheckResult.length == 0) {

                        // CHECK USERNAME isn't used: QUERY
                        try {
                            mysqlConnectionfidsbay.query(sql_check_username,[req.body.profileUsername,req.body.profileSession],function (err,checkUsernameResult,fields) { 

                                // Confirm username Statment
                                if (checkUsernameResult.length == 0) {
                                    console.log('Good to go');
                                }else{

                                }
                            });
                        } catch (error){

                        }
                    }else{

                    }
                });
            } catch (error){

            }


        }else{
            console.log('Illegal Attack');
        }



       
    
    });  



module.exports = router;