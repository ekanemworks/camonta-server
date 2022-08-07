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

router.get('/getTerritories', (req,res) => {
    if (req.headers.uikey == CUSTOMKEYS.uikey) {
        // SQL_STATEMENTS
        const sql_get_territories = "SELECT * FROM appconfig_territories WHERE invaded = 'true'";
        try {
            mysqlConnectionfidsbay.query(sql_get_territories,function (err,results,fields) {
                dataResponse = {
                    status: 0, 
                    body: results,
                    message: ' successful'
                };
                console.log(dataResponse);
                res.send(dataResponse);
            });

        }catch (error) {
                console.log(error);
        }

    }
});


router.get('/getStateAreaList/:state', (req,res) => {
    var state = req.params.state
    if (req.headers.uikey == CUSTOMKEYS.uikey) {
        // SQL_STATEMENTS
        const sql_get_stateAreaList = "SELECT * FROM appconfig_state WHERE state = ? AND invaded = 'true'";
        try {
            mysqlConnectionfidsbay.query(sql_get_stateAreaList,[state],function (err,results,fields) {
                dataResponse = {
                    status: 0, 
                    body: results[0],
                    message: ' successful'
                };
                console.log(dataResponse);
                res.send(dataResponse);
            });

        }catch (error) {
                console.log(error);
        }

    }
});

router.get('/getAccountType', (req,res) => {
    if (req.headers.uikey == CUSTOMKEYS.uikey) {
        // SQL_STATEMENTS
        const sql_get_territories = "SELECT * FROM accounttype WHERE available = 'true'";
        try {
            mysqlConnectionfidsbay.query(sql_get_territories,function (err,results,fields) {
                dataResponse = {
                    status: 'ok', 
                    body: results,
                    message: ' successful'
                };
                console.log(dataResponse);
                res.send(dataResponse);
            });

        }catch (error) {
                console.log(error);
        }

    }
});




router.get('/getProductTypesMeal', (req,res) => {
    if (req.headers.uikey == CUSTOMKEYS.uikey) {
        // SQL_STATEMENTS
        const sql_get_productTypeMeal = "SELECT * FROM appconfig_producttype_meal WHERE available = 'true'";
        try {
            mysqlConnectionfidsbay.query(sql_get_productTypeMeal,function (err,results,fields) {
                dataResponse = {
                    status: 'ok', 
                    body: results,
                    message: ' successful'
                };
                console.log(dataResponse);
                res.send(dataResponse);
            });

        }catch (error) {
                console.log(error);
        }

    }
});
        
        

module.exports = router;