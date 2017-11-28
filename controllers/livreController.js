const LivreDAOpg = require('../DAO/DAOpg/DAOLivre');
const livreDAOpg = new LivreDAOpg();

exports.listLivre = function (req,res,next) {
    livreDAOpg.getAllLivres(
        function(lesLivres) {
            res.render('catalogue/livre/listeLivres', {title:'liste des livres', listLivre:lesLivres});
        });
    };



