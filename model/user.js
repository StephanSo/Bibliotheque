class Users{
    constructor(unIdUser, unUsername, unPassword, unNom, unPrenom){
        this._idUser = unIdUser;
        this._username = unUsername;
        this._password = unPassword;
        this.nom = unNom;
        this.prenom = unPrenom;

    }
}

module.exports = Users;