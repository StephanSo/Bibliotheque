var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/catalogue', function (req,res,next) {
  res.render('catalogueIndex',{title:'Bienvenue sur la Catalogue de la Bibliothèque'});

})

module.exports = router;
