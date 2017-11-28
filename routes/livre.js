var express = require('express');
var router = express.Router();
var livreController = require('../controllers/livreController');

router.get('/', livreController.listLivre);
router.get('/livredetail/:id', livreController.livreById);

module.exports = router;