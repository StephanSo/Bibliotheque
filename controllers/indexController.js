
exports.index = function (req,res,next) {
    res.render('index', {title:'Bibliothèque'});
}
exports.catalogue = function (req,res,next) {
    res.render('catalogueIndex', {title:'Catalogue de la Bibliothèque'});
}