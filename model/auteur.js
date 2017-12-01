class Auteur{
    constructor(unIdAuteur, unNom, unPrenom,uneDateDeNaissance, uneDateDeDeces){
        this.idAuteur = unIdAuteur;
        this.nom = unNom;
        this.prenom = unPrenom;
        this.dateDeNaissance = uneDateDeNaissance;
        this.dateDeDeces = uneDateDeDeces;
    }

}
module.exports=Auteur;