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
    
});



module.exports = router;