var express = require('express');
var router = express.Router();



var authController = require('../controllers/authController');

router.get('/',authController.login_form);

router.post('/',authController.login_authentication);

router.get('/logout',authController.logout);


module.exports = router;
