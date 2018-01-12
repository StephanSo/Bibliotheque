var express = require('express');
var router = express.Router();
var documentController = require('../controllers/documentController');

router.get('/', documentController.listDoc);
router.get('/documentDetail/:id', documentController.documentById);
module.exports = router;