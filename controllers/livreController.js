const LivreDAOpg = require('../DAO/DAOpg/DAOLivre');
const livreDAOpg = new LivreDAOpg();
const AuteurDAOpg = require('../DAO/DAOpg/DAOAuteur');
const auteurDAOpg = new AuteurDAOpg();
const ExemplaireDAOpg = require('../DAO/DAOpg/DAOExemplaire');
const exemplaireDAOpg = new ExemplaireDAOpg();
const LecteurDAOpg = require('../DAO/DAOpg/DAOLecteur');
const lecteurDAOpg = new LecteurDAOpg();

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
exports.exemplaireBylivreId = function (req, res, next) {
    let id = req.params.id;
    exemplaireDAOpg.getAllExemplaireByIdLivre(id, function (lesExemplaire) {
        console.log(req.session);
        res.render('catalogue/livre/exemplaireLivre', {
            listeExemplaire: lesExemplaire,
            user: req.session.user,
            role: req.session.role
        });

    })
}
exports.exemplaireByNumeroByLivreId = function (req, res , next) {
    let id = req.params.id;
    let numero = req.params.numero;
    exemplaireDAOpg.getExemplaireByNumeroAndId(id, numero, function (lExemplaire) {
        livreDAOpg.getLivreById(id, function (leLivre) {
            lecteurDAOpg.getLecteurById(lExemplaire.lecteur, function (leLecteur) {
                res.render('catalogue/livre/unExemplaireLivre',{lexemplaire: lExemplaire,livre:leLivre,lecteur:leLecteur, user: req.session.user,role: req.session.role});

            })
        })


    })

}



