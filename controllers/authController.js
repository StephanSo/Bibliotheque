const DAOUser= require('../DAO/DAOpg/DAOUser');
const daoUser = new DAOUser();

exports.login_form = function(req, res) { // attention à la route / depuis le /login
    res.render('login/login',{user:req.session.cookie.user, role:req.session.cookie.role});
};

exports.login_authentication = function(req, res) {
    username = req.body.username;
    password = req.body.password;

    daoUser.loginUser(username, password, function (okpasok) {
        console.log(okpasok);
        if(okpasok==="ok"){
            daoUser.checkRole(username,function (leRole) {
                req.session.user=username;
                req.session.role=leRole;
                console.log(req.session);
                res.render('index', {user:req.session.user, role:req.session.role});
            });

        }
        else{
            res.render('login/login');
        }

    });

};


//LOGOUT
exports.logout = function(req, res){
    req.session.user = undefined;
    req.session.role = undefined;
    res.redirect('/');
};