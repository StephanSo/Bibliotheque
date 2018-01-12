var express = require('express');
var router = express.Router();
var documentController = require('../controllers/documentController');

router.get('/', documentController.listDoc);
router.get('/documentDetail/:id', documentController.documentById);
router.get('/documentDetail/:id/exemplaire', documentController.exemplaireByDocId);
module.exports = router;