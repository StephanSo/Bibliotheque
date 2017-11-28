const LivreDAOpg = require('../DAO/DAOpg/DAOLivre');
const livreDAOpg = new LivreDAOpg();

exports.listLivre = function (req,res,next) {
    livreDAOpg.getAllLivres(
        function(lesLivres) {
            res.render('catalogue/livre/listeLivres', {title:'liste des livres', listLivre:lesLivres});
        });
    };
exports.livreById = function (req, res, next) {
    let id = req.params.id;
    livreDAOpg.getLivreById(id,
        function (leLivre) {
        res.render('catalogue/livre/livreDetail',{id, unLivre: leLivre})

        });
};



