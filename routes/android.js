var express = require('express');
var router = express.Router();


var androidController = require('../controllers/androidController');
/* GET home page. */

router.get('/', androidController.index);
router.get('/listLivre', androidController.listLivre);


module.exports = router;
