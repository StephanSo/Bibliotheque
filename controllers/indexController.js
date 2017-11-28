
exports.index = function (req,res,next) {
    res.render('index', {title:'Bibliothèque'});
}
exports.catalogue = function (req,res,next) {
    res.render('catalogue/catalogueIndex', {title:'Catalogue de la Bibliothèque'});
}