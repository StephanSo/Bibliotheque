const LivreDAOpg = require('../DAO/DAOpg/DAOLivre');
const livreDAOpg = new LivreDAOpg();
const AuteurDAOpg = require('../DAO/DAOpg/DAOAuteur');
const auteurDAOpg = new AuteurDAOpg();

exports.listLivre = function (req,res,next) {
    livreDAOpg.getAllLivres(
        function(lesLivres) {
            console.log(req.session);
            res.render('catalogue/livre/listeLivres', {title:'liste des livres', listLivre:lesLivres,user:req.session.user, role:req.session.role});

        });
    };
exports.livreById = function (req, res, next) {
    let id = req.params.id;
    livreDAOpg.getLivreById(id,
        function (leLivre) {
        auteurDAOpg.getAuteurByIdLivre(id,
            function (lAuteur) {
                res.render('catalogue/livre/livreDetail',{id, unLivre:leLivre, unAuteur: lAuteur,user:req.session.user, role:req.session.role})
            })


        });
};



