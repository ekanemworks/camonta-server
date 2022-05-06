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

        
        




    router.post('/createAccount', (req,res) => {

        // console.log('123');
        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        if (req.headers.uikey == CUSTOMKEYS.uikey) {
            // SQL_STATEMENTS
            const sql_check_email = "SELECT * FROM members WHERE profileEmail = ?";
            const sql_check_username = "SELECT * FROM members WHERE profileUsername = ?";

                // CHECK EMAIL QUERY
                try {
                    mysqlConnectionfidsbay.query(sql_check_email,[req.body.profileEmail],function (err,emailCheckResult,fields) {

                        // Confirm Email Statment
                        if (emailCheckResult.length == 0) {
                            // console.log('pass 3');

                            // CHECK USERNAME QUERY
                            try {
                                mysqlConnectionfidsbay.query(sql_check_username,[req.body.profileUsername],function (err,checkUsernameResult,fields) { 
                                    // console.log('pass 4');

                                    // Confirm username Statment
                                    if (checkUsernameResult.length == 0) {
                                        // console.log('pass 5');

                                        if (req.body.profileType == 'Chef / Catering') {
                                            var profileType         = 'Chef'
                                        }else{
                                            var profileType         = req.body.profileType
                                        }

                                        var profileSession      = uuidv4()
                                        var profileName         = req.body.profileName
                                        var profileUsername     = req.body.profileUsername
                                        var profilePhoto        = req.body.profilePhoto
                                        var profileBio          = req.body.profileBio
                                        var profileEmail        = req.body.profileEmail
                                        var profileEmailStatus  = 'not verified'
                                        var password            = md5(req.body.password);
                                        var profileCountry      = req.body.profileCountry;
                                        var profileState        = '';
                                        var profileRegion       = '';
                                        var registrationDate    = date.format(new Date(), 'ddd, MMM DD YYYY');
                                        var notification        = JSON.stringify([])
                                        var myProductCount      = 0
                                        var myPurchase          = JSON.stringify([])
                                        var profileLikeForIdList    = JSON.stringify([])
                                        var profileLikeByIdList     = JSON.stringify([])
                                        var profileServes           = 0
                                        var profilePoints           = 0.0

                                        // 18 COLUMNS IN DB (INCLUDING ID): 17 values in LIST below
                                        var escape_Signup_List = [
                                            profileType,
                                            profileSession,
                                            profileName,
                                            profileUsername,
                                            profilePhoto,
                                            profileBio,
                                            profileEmail,
                                            profileEmailStatus,
                                            password,
                                            profileCountry,
                                            profileState,
                                            profileRegion,
                                            registrationDate,
                                            notification,
                                            myProductCount,
                                            myPurchase,
                                            profileLikeForIdList,
                                            profileLikeByIdList,
                                            profileServes,
                                            profilePoints,
                                            'not verified'
                                        ];

                                        const sql_create_account = "INSERT INTO members VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                                        // INSERT QUERY
                                        try {
                                            mysqlConnectionfidsbay.query(sql_create_account,escape_Signup_List,function (err,result2,fields) {
                                                // console.log('pass 6');

                                                if (!err) {
                                                    // console.log('pass 7');

                                                    // Getting back the values to retrieve the user ID also
                                                    const sql_get_new_user = "SELECT * FROM members WHERE profileSession = ?";
                                                    mysqlConnectionfidsbay.query(sql_get_new_user,[profileSession],function (err,result3,fields) {


                                                        if (!err) {
                                                            // console.log(result3);
                                                                    
                                                            // var mailOptions = {
                                                            //     from: 'no-reply@fidsbay.com',
                                                            //     to: req.body.profileEmail,
                                                            //     subject: 'Your New Baybn Account',
                                                            //     html:  '<h1>Welcome to Baybn</h1> \
                                                            //             <div style="font-size:16px">\
                                                            //             \
                                                            //             <div>Hi '+req.body.profileName+',</div>  \
                                                            //             </div>\
                                                            //             '
                                                            // }
                                                            // try {
                                                    
                                                            //     transporter.sendMail(mailOptions, function(error,info){
                                                                        
                    
                                                            //     });
                                                            // } catch (error) {
                                                                
                                                            //     res.send({status: 'error'});
                                                            // }

                                                                    dataResponse = {
                                                                        status: 'ok',
                                                                        body: result3[0],
                                                                        direction: 'home',
                                                                        message: 'Signup successful'
                                                                    }
                                                                    // console.log(bodyResponse);
                
                                                                    res.send(dataResponse);

                                                        }else{
                                                            
                                                        }


                                                    });

                                                }else{
                                                    console.log(err);
                                                }          

                                            });
                                        } catch (error) {
                                            
                                        }

                                    }else{

                                        bodyResponse = {
                                            status: 'error',
                                            session: '',
                                            direction: '',
                                            message: 'Username already taken'
                                        }

                                        res.send(bodyResponse)
                                    }

                                });
                                
                            } catch (error) {
                                
                            }
                    
                            

                        }else{

                            bodyResponse = {
                                status: 'error',
                                session: '',
                                direction: '',
                                message: 'Email already used'
                            }
                            // console.log(bodyResponse);

                            res.send(bodyResponse)
                        }
                    
                    });

                } catch (error) {
                    console.log(error);   
                }


        }else{
            // Notify of threat
        }
  
        
        
    });   

    
        

    // ADD FOOD INTERESTS
    // ADD FOOD INTERESTS
    // ADD FOOD INTERESTS
    // ADD FOOD INTERESTS
    router.post('/addInterests', (req,res) => {
           
            // const sql_interests = "UPDATE members SET interests = ? WHERE session = ? ";
            // var myinterest =  req.body.myinterest;
            // var session = req.body.session;

            // myinterest = JSON.stringify(myinterest);
        

            // try {
            //     mysqlConnectionfidsbay.query(sql_interests,[myinterest,session],function (err,result1,fields) {

            //         if (!err) {
            //             res.send({status: 'ok', message: 'success'});
            //         }else{
            //             console.log(err);
            //             res.send({status: 'error', message: 'database error'});

            //         }

            //     });

            // } catch (error) {
            //     console.log(error);
            //     res.send({status: 'error', message: 'server error'});

            // }
  
        
        
    });  



module.exports = router;