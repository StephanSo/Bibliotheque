const DAOAndroid = require('../DAO/DAOpg/DAOAndroid');
const androidDAOpg = new DAOAndroid();


exports.index = function (req,res,next) {
    androidDAOpg.getAllLivres(function(lesLivres) {
        let test =JSON.stringify(lesLivres);
        res.render('android/androidrecup', {title: 'liste des livres', listLivre: test});
    });

}
exports.listLivre = function (req,res,next) {
    res.render('android/androidrecup');
}