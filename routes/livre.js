var express = require('express');
var router = express.Router();
var livreController = require('../controllers/livreController');

router.get('/livredetail/:id', livreController.livreById);
router.get('/livredetail/:id/exemplaire', livreController.exemplaireBylivreId);
router.get('/livredetail/:id/exemplaire/:numero', livreController.exemplaireByNumeroByLivreId);
router.get('/addlivre', livreController.affichePageAddLivre);
router.post('/addlivre', livreController.ajoutLivre);
router.get('/addExemplaire', livreController.affichePageAddExemplaire);
router.post('/addExemplaire', livreController.ajoutExemplaire);
module.exports = router;