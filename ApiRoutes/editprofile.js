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

        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        if (req.headers.uikey == CUSTOMKEYS.uikey) {

            var escape_update_profile_input = [
                req.body.profileName,
                req.body.profileUsername,
                req.body.profileBio,
                req.body.profileEmail,
                req.body.profileSession
            ]

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

                                    // TO CHECK IF THERE IS SPACE IN THE USERNAME STRING
                                    // TO CHECK IF THERE IS SPACE IN THE USERNAME STRING
                                    var space_check = req.body.profileUsername.indexOf(' ');
                                    if (space_check == -1) {
                                        try {

                                            const sql_update_profile_info = "UPDATE members SET profileName=?, profileUsername=?, profileBio=?, profileEmail=? WHERE profileSession=?"
                                            mysqlConnectionfidsbay.query(sql_update_profile_info,escape_update_profile_input,function (err,rows,fields) {
                            

                                                // To send back to update localstorage
                                                const sql_get_user_info = "SELECT * FROM members WHERE profileSession=?";
                                                mysqlConnectionfidsbay.query(sql_get_user_info,[req.body.profileSession],function (err,resultbody,fields) {
                                                    console.log(resultbody)
                                                    dataResponse = {
                                                        status: 'ok',
                                                        body: resultbody[0],
                                                        direction: 'editprofile',
                                                        message: 'update successful'
                                                    }                    
                                                    res.send(dataResponse)
                                                
                                                });

                                            });
                                        } catch (error) {
                                            
                                        }
                                    }else{

                                        dataResponse = {
                                            status: 'error',
                                            // body: result1[0],
                                            direction: 'editprofile',
                                            message: 'username must not have space in it'
                                        }                    
                                        res.send(dataResponse)

                                    }


                                    
                                }else{
                                    dataResponse = {
                                        status: 'error',
                                        // body: result1[0],
                                        direction: 'editprofile',
                                        message: 'Username is taken!'
                                    }                    
                                    res.send(dataResponse)
                                }
                            });
                        } catch (error){

                        }
                    }else{
                        dataResponse = {
                            status: 'error',
                            // body: result1[0],
                            direction: 'editprofile',
                            message: 'Email is already in use!'
                        }                    
                        res.send(dataResponse)

                    }
                });
            } catch (error){

            }


        }else{
            console.log('Illegal Attack');
        }



       
    
    });  



module.exports = router;