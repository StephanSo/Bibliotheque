
exports.index = function (req,res,next) {
    console.log(req.session);

    res.render('index', {title:'Bibliothèque', user:req.session.user, role:req.session.role});
}
exports.catalogue = function (req,res,next) {
    res.render('catalogue/catalogueIndex', {title:'Catalogue de la Bibliothèque',user:req.session.user, role:req.session.role});
}