var express = require('express');
var router = express.Router();
var documentController = require('../controllers/documentController');

router.get('/', documentController.listDoc);
router.get('/documentDetail/:id', documentController.documentById);
router.get('/documentDetail/:id/exemplaire', documentController.exemplaireByDocId);
router.get('/documentDetail/:id/exemplaire/:numero', documentController.exemplaireByNumeroByLivreId);
router.get('/documentDetail/:id/numero', documentController.numeroMagazineByMagazineId);
router.get('/documentDetail/:id/numero/:numero', documentController.detailNumeroMagazineByNumero);
module.exports = router;