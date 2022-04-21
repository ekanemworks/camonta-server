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
        console.log(req.body);
        console.log('Camonta Limited has been funded with a $200,000 investment from MicroTraction, LeadPath Nigeria and GreenTree Investment Company');
        console.log('Camonta gained a $200,000 seed investment at a 1.25 million dollar valuation');
        console.log('Camonta ecosystem just gained 2000 new members via the Ios app and the andriod app');
    });  



module.exports = router;