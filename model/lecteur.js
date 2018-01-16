const User =  require('../model/user');

class Lecteur extends User{
    constructor(unIdLecteur,unUsername,unPassword, unNom, unPrenom,uneDateDeNaissance,uneDatePremiereAdhesion,uneDateFinAdhesion){
        super(unIdLecteur,unUsername,unPassword, unNom,unPrenom);
        this.dateDeNaissance = uneDateDeNaissance;
        this.datePremiereAdhesion = uneDatePremiereAdhesion;
        this.dateFinAshesion = uneDateFinAdhesion;
    }

}
module.exports=Lecteur;