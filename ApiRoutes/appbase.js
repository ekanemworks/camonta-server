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



router.post('/getTerritories', (req,res) => {

    // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
    // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
    // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
    if (req.headers.uikey == CUSTOMKEYS.uikey) {
        const sql_getTerritory = "SELECT * FROM territory WHERE country = ?";
        try {
            mysqlConnectionfidsbay.query(sql_getTerritory,[req.body.profileCountry],function (err,result1,fields) {
                      
                    dataResponse = {
                        status: 'ok',
                        body: result1[0],
                        message: 'Territories gotton'
                    }                    
                    // console.log(dataResponse);

                    res.send(dataResponse)
            });

        } catch (error) {
            console.log(error);   
        }
    }else{

    }

});






module.exports = router;