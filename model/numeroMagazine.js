class NumeroMagazine{
    constructor(unNumeroMagazine, unMagazine, unTitre, uneDateDePartution, unStatut, unLecteur, uneDateRetourM){

        this.numeroMagazine =  unNumeroMagazine;
        this.magazine = unMagazine;
        this.titre = unTitre;
        this.dateDeParution = uneDateDePartution;
        this.statut = unStatut;
        this.lecteur = unLecteur;
        this.dateRetourM = uneDateRetour;
    }
}
module.exports=NumeroMagazine;