var express = require('express');
var router = express.Router();


var indexController = require('../controllers/indexController');
/* GET home page. */

router.get('/', indexController.index);
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/catalogue', indexController.catalogue);
// router.get('/catalogue', function (req,res,next) {
//   res.render('catalogueIndex',{title:'Bienvenue sur la Catalogue de la Bibliothèque'});
//
// })

module.exports = router;
