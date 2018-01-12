const DocumentDAOpg = require('../DAO/DAOpg/DAODocument');
const documentDAOpg = new DocumentDAOpg();


exports.listDoc = function (req,res,next) {
    documentDAOpg.getAllDocument(
        function(lesDocuments) {
            console.log(req.session);
            res.render('catalogue/documents/listeDoc', {title:'liste des documents', listdoc:lesDocuments,user:req.session.user, role:req.session.role});

        });
};



