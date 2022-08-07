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


router.post('/getChefs', (req,res) => {
    // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
    // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
    // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
    if (req.headers.uikey == CUSTOMKEYS.uikey) {
        // SQL_STATEMENTS
        const sql_get_balance = "SELECT * FROM members WHERE profileType = 'Chef'";
        try {
            mysqlConnectionfidsbay.query(sql_get_balance,function (err,results,fields) {
                dataResponse = {
                    status: 'ok', 
                    body: results,
                    message: ' successful'
                };
                
                res.send(dataResponse);
            });

        }catch (error) {
                console.log(error);
        }

    }


});



router.post('/getRecommendations/:page', (req,res) => {
    // console.log('call Recommended');
    var profileCountry = req.body.profileCountry;
    console.log(profileCountry);
    var productCount = req.body.productCount;
    console.log('product Count '+productCount);
    var startId = req.body.start;
    var endId = startId + 5; // but this endId should be the less than the total amount of value in the database, else and error will occur
    if (endId>productCount) {
       endId = productCount;
    }
    var newStartId = endId+1;
    console.log('startId '+startId);
    console.log('endId '+endId);

    // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
    // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
    // SECURITY PROTOCOL 1: VALIDATING CUSTOM UI KEY FROM MOBILE APP
    if (req.headers.uikey == CUSTOMKEYS.uikey) {

        // First Time touching server: to get total possible values/records, to limit endId
        // First Time touching server: to get total possible values/records, to limit endId
        if (startId == 1) {

            // SQL_STATEMENTS: to get total product count, to be used later
            const sql_get_totalProducts_count = "SELECT * FROM products WHERE productCountry=?";

            // query: get total product count
            try {
                mysqlConnectionfidsbay.query(sql_get_totalProducts_count,[profileCountry],function (err,resultProducts,fields) {
                    var productsCount = resultProducts.length;

                    // sql: get product lists
                    const sql_get_myProduct = "SELECT products.id, products.productCode, \
                    products.productClass, products.productType, products.productCaption, \
                    products.productItem, products.productCategory, products.productPreparationtime, \
                    products.productPrice, products.productCurrency, products.productPhotos, \
                    products.productOwnerid, products.productRating, products.productHits, \
                    products.productCountry, products.productState, products.productRegion, \
                    products.dateCreated, members.profileName, members.profileUsername, members.profilePhoto, members.profileVerificationStatus \
                    FROM products INNER JOIN members ON products.productOwnerid=members.id WHERE products.productCountry = ? AND products.id BETWEEN ? AND ?\
                    ORDER BY id";
        
                        // query: get PRODUCT List
                        try {
                            mysqlConnectionfidsbay.query(sql_get_myProduct,[profileCountry,startId,endId],function (err,result,fields) {
                                dataResponse = {
                                    status: 'ok',
                                    body: result,
                                    newstart: newStartId,
                                    productCount: productsCount,
                                    message: 'Product Gotten'
                                };
                                // console.log(dataResponse);
        
                                res.send(dataResponse);
                            });
        
                        }catch (error) {
                                console.log(error);
                        }

                });

            }catch (error) {
                    console.log(error);
            }

            
            
        }else{
            // Second or More Time touching server
            // Second or More Time touching server
            const sql_get_myProduct = "SELECT products.id, products.productCode, \
            products.productClass, products.productType, products.productCaption, \
            products.productItem, products.productCategory, products.productPreparationtime, \
            products.productPrice, products.productCurrency, products.productPhotos, \
            products.productOwnerid, products.productRating, products.productHits, \
            products.productCountry, products.productState, products.productRegion, \
            products.dateCreated, members.profileName, members.profileUsername, members.profilePhoto, members.profileVerificationStatus \
            FROM products INNER JOIN members ON products.productOwnerid=members.id WHERE products.productCountry = ? AND products.id BETWEEN ? AND ?\
            ORDER BY id";

                // GET PRODUCT QUERY
                try {
                    mysqlConnectionfidsbay.query(sql_get_myProduct,[profileCountry, startId,endId],function (err,result,fields) {
                        dataResponse = {
                            status: 'ok',
                            body: result,
                            newstart: newStartId,
                            message: 'Product Gotten'
                        };
                        // console.log(dataResponse);

                        res.send(dataResponse);
                    });

                }catch (error) {
                        console.log(error);
                }
        }
        

    }


});
module.exports = router;