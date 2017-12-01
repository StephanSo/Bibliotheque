const LivreDAOpg = require('../DAO/DAOpg/DAOLivre');
const livreDAOpg = new LivreDAOpg();
const AuteurDAOpg = require('../DAO/DAOpg/DAOAuteur');
const auteurDAOpg = new AuteurDAOpg();

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
        auteurDAOpg.getAuteurByIdLivre(id,
            function (lAuteur) {
                res.render('catalogue/livre/livreDetail',{id, unLivre:leLivre, unAuteur: lAuteur})
            })


        });
};



