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


router.post('/addProductInformation', (req,res) => {

    console.log('entered');
        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
        if (req.headers.uikey == CUSTOMKEYS.uikey) {
            // SQL_STATEMENTS
            // SQL_STATEMENTS
            const sql_create_new_product = "INSERT INTO products VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            const sql_update_member_info = "UPDATE members SET myProductCount = ? WHERE id=?";
            
            var productCode = uuidv4()
            var productClass = req.body.productClass;
            var productType = req.body.productType;
            var productCaption = req.body.productCaption;
            var productItem = req.body.productItem;
            var productCategory = req.body.productCategory;
            var productPreparationtime = req.body.productPreparationtime;
            var productPrice = req.body.productPrice;
            var productCurrency = req.body.productCurrency;
            var productPhotos = ''
            var productOwnerid = req.body.productOwnerId;
            var productRating = 0
            var productHits = 0
            var productCountry = req.body.productCountry;
            var productState = req.body.productState;
            var productRegion = req.body.productRegion;
            var datetime = new Date();
            var dateCreated = date.format(datetime, 'ddd, MMM DD YYYY');

            var escape_product_input = [
                productCode,
                productClass,
                productType,
                productCaption,
                productItem,
                productCategory,
                productPreparationtime,
                productPrice,
                productCurrency,
                productPhotos,
                productOwnerid,
                productRating,
                productHits,
                productCountry,
                productState,
                productRegion,
                dateCreated
            ]
            console.log(escape_product_input);

            console.log('about insert try');

            // INSERT PRODUCT QUERY
            // INSERT PRODUCT QUERY
            try {
                mysqlConnectionfidsbay.query(sql_create_new_product,escape_product_input,function (err,result,fields) {

                    if (!err) {
                        var productnumber = req.body.myProductCount;
                        productnumber++
                

                        // UPDATE MEMBER PRODUCT COUNT QUERY
                        // UPDATE MEMBER PRODUCT COUNT QUERY
                        mysqlConnectionfidsbay.query(sql_update_member_info,[productnumber,req.body.productOwnerId],function (err,result,fields) {
                                        
                            dataResponse = {
                                status: 'ok', 
                                message: 'product upload successful', 
                                productCode: productCode
                            };
                            res.send(dataResponse);
                            console.log(dataResponse);

                        }); 

                    }else{
                        console.log(err);
                    }

                });

            }catch (error) {
                    console.log(error);
            }

        }else{

        }

});



module.exports = router;