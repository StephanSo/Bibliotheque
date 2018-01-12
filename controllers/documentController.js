const DocumentDAOpg = require('../DAO/DAOpg/DAODocument');
const documentDAOpg = new DocumentDAOpg();
const AuteurDAOpg = require('../DAO/DAOpg/DAOAuteur');
const auteurDAOpg = new AuteurDAOpg();

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

