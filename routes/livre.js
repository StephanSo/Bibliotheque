var express = require('express');
var router = express.Router();
var livreController = require('../controllers/livreController');

router.get('/', livreController.listLivre);


module.exports = router;