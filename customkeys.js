const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var cors = require('cors');

router.use(cors()); 

var customKeys = {
    uikey: 'billionairesservicetohumanity2022',
};




module.exports = customKeys;