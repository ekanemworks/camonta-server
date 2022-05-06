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



router.post('/getMyProducts', (req,res) => {

        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        if (req.headers.uikey == CUSTOMKEYS.uikey) {
            console.log(req.body.productOwnerid);
            // const sql_get_myProduct = "SELECT * FROM products WHERE products.productOwnerid =?";


              
            const sql_get_myProduct = "SELECT products.id, products.productCode, \
            products.productClass, products.productType, products.productCaption, \
            products.productItem, products.productCategory, products.productPreparationtime, \
            products.productPrice, products.productCurrency, products.productPhotos, \
            products.productOwnerid, products.productRating, products.productHits, \
            products.productCountry, products.productState, products.productRegion, \
            products.dateCreated, members.profileName, members.profileUsername, members.profilePhoto, members.profileVerificationStatus \
            FROM products INNER JOIN members ON products.productOwnerid=members.id WHERE members.id = ? ORDER BY products.id";
            
             // GET PRODUCT QUERY
            try {
                mysqlConnectionfidsbay.query(sql_get_myProduct,[req.body.productOwnerid],function (err,result,fields) {
                    dataResponse = {
                        status: 'ok',
                        body: result,
                        message: 'Product gotten'
                    };
                    // console.log(dataResponse);

                    res.send(dataResponse);
                });

            }catch (error) {
                    console.log(error);
            }
        }
});


module.exports = router;