class NumeroMagazine{
    constructor(unNumeroMagazine, unMagazine, unTitre, uneDateDePartution, unStatut, unLecteur, uneDateRetourM){

        this.numeroMagazine =  unNumeroMagazine;
        this._magazine = unMagazine;
        this.titre = unTitre;
        this.dateDeParution = uneDateDePartution;
        this.statut = unStatut;
        this.lecteur = unLecteur;
        this.dateRetourM = uneDateRetourM;
    }
    get getMagazine(){
        return this._magazine;
    }
}
module.exports=NumeroMagazine;