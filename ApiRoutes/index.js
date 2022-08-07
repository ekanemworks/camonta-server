const express = require('express');
const router = express.Router();


// router.use('/api1.0/ads', require('./ads'));
// router.use('/api1.0/autoSuggestions', require('./autosuggestions'));
// router.use('/api1.0/homefeed', require('./homefeed'));
// router.use('/api1.0/explore', require('./explore'));
// router.use('/api1.0/filter', require('./filter'));
// router.use('/api1.0/addproduct', require('./addproduct'));
// router.use('/api1.0/login', require('./login'));
// router.use('/api1.0/watchtower', require('./watchtower'));
// router.use('/api1.0/memberinfo', require('./memberinfo'));
// // get info for only one product
// router.use('/api1.0/getproductinfo', require('./getproductinfo'));
// router.use('/api1.0/shopproducts', require('./shopproducts'));
// router.use('/api1.0/settings', require('./settings'));
// router.use('/api1.0/signupregular', require('./signupregular'));
// router.use('/api1.0/signupbusiness', require('./signupbusiness'));
// router.use('/api1.0/updateprofileinfo', require('./updateprofileinfo'));
// router.use('/api1.0/updateiteminfo', require('./updateiteminfo'));
// router.use('/api1.0/like', require('./like'));
// router.use('/api1.0/activity', require('./old_api/activity'));
// router.use('/api1.0/deleteitem', require('./deleteitem'));
// router.use('/api1.0/resetPassword', require('./resetpassword'));
// router.use('/api1.0/signupcustomer', require('./signupcustomer'));
// router.use('/api1.0/support', require('./support'));
// router.use('/api1.0/versionControl', require('./versionControl'));
// router.use('/api1.0/placeorder', require('./placeorder'));
// router.use('/api1.0/orders', require('./orders'));
// router.use('/api1.0/mealpage', require('./mealpage'));
// router.use('/api1.0/grocerypage', require('./grocerypage'));
// router.use('/api1.0/cateringpage', require('./cateringpage'));
// // WALLET TRANSACTION
// router.use('/api1.0/transaction', require('./wallet'));



router.use('/api1.0/apiconfiguration', require('./configuration'));
router.use('/api1.0/signup', require('./signup'));
router.use('/api1.0/login', require('./login'));
router.use('/api1.0/editprofile', require('./editprofile'));
router.use('/api1.0/settings', require('./settings'));


router.use('/api1.0/addproduct', require('./addproduct'));
router.use('/api1.0/appbase', require('./appbase'));
router.use('/api1.0/getproducts', require('./getproducts'));
router.use('/api1.0/wallet', require('./wallet'));
router.use('/api1.0/feeds', require('./feeds'));



module.exports = router;