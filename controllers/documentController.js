const DocumentDAOpg = require('../DAO/DAOpg/DAODocument');
const documentDAOpg = new DocumentDAOpg();
const AuteurDAOpg = require('../DAO/DAOpg/DAOAuteur');
const auteurDAOpg = new AuteurDAOpg();
const ExemplaireDAOpg = require('../DAO/DAOpg/DAOExemplaire');
const exemplaireDAOpg = new ExemplaireDAOpg();
const LecteurDAOpg = require('../DAO/DAOpg/DAOLecteur');
const lecteurDAOpg = new LecteurDAOpg();
const MagazineDAOpg = require('../DAO/DAOpg/DAOMagazine');
const magazineDAOpg = new MagazineDAOpg();
const NumeroMagazine = require('../model/numeroMagazine');

exports.listDoc = function (req,res,next) {
    documentDAOpg.getAllDocument(
        function(lesDocuments) {
            console.log(req.session);
            res.render('catalogue/documents/listeDoc', {title:'liste des documents', listdoc:lesDocuments,user:req.session.user, role:req.session.role});

        });
};

exports.documentById = function (req, res, next) {
    let id = req.params.id;
    documentDAOpg.getDocumentById(id,
        function (leDocument) {
            if(!leDocument.isbn) {
                res.render('catalogue/documents/docDetail', {
                    id,
                    unDocument: leDocument,
                    user: req.session.user,
                    role: req.session.role
                })
            }
            if(leDocument.isbn){
                auteurDAOpg.getAuteurByIdLivre(id,
                    function (lAuteur) {
                        res.render('catalogue/documents/docDetail',{id, unDocument:leDocument, unAuteur: lAuteur,user:req.session.user, role:req.session.role})
                    })
            }
        });
};
exports.exemplaireByDocId = function (req, res, next) {
    let id = req.params.id;
    exemplaireDAOpg.getAllExemplaireByIdLivre(id, function (lesExemplaire) {
        console.log(req.session);
        res.render('catalogue/documents/exemplaireLivre', {
            listeExemplaire: lesExemplaire,
            user: req.session.user,
            role: req.session.role
        });
    });
};

exports.exemplaireByNumeroByLivreId = function (req, res, next) {
    let id = req.params.id;
    let numero = req.params.numero;
    exemplaireDAOpg.getExemplaireByNumeroAndId(id, numero, function (lExemplaire) {
        documentDAOpg.getDocumentById(id, function (leLivre) {
            lecteurDAOpg.getLecteurById(lExemplaire.lecteur, function (leLecteur) {
                res.render('catalogue/documents/unExemplaireLivre',{lexemplaire: lExemplaire,livre:leLivre,lecteur:leLecteur, user: req.session.user,role: req.session.role});

            })
        })


    })
};
exports.numeroMagazineByMagazineId = function (req, res, next){
  let id = req.params.id;
  magazineDAOpg.getLesNumerosByMagazineId(id,function (lesNumerosMagazine) {
      res.render('catalogue/documents/numeroMagazine',{listeNumero: lesNumerosMagazine,leMag:id, user: req.session.user,role: req.session.role});
  });
};
exports.detailNumeroMagazineByNumero =  function (req,res,next) {
    let id = req.params.id;
    let numero = req.params.numero;
    magazineDAOpg.getLesNumerosByMagazineId(id,function (lesNumerosMagazine) {
        lesNumerosMagazine.forEach(function (i) {
           if(i.numeroMagazine === parseInt(numero,10)){
               lecteurDAOpg.getLecteurById(i.lecteur, function (leLecteur) {
                   res.render('catalogue/documents/detailNumeroMagazine', {
                       leNumero: i,
                       leNum: numero,
                       lecteur:leLecteur,
                       leMag: id,
                       user: req.session.user,
                       role: req.session.role
                   })
               });
           }
        });



    })

}