class Lecteur{
    constructor(unIdLecteur, unNom, unPrenom,uneDateDeNaissance,uneDatePremiereAdhesion,uneDateFinAdhesion){
        this.idLecteur = unIdLecteur;
        this.nom = unNom;
        this.prenom = unPrenom;
        this.dateDeNaissance = uneDateDeNaissance;
        this.datePremiereAdhesion = uneDatePremiereAdhesion;
        this.dateFinAshesion = uneDateFinAdhesion;
    }

}
module.exports=Lecteur;