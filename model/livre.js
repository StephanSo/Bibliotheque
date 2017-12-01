class Livre{
    constructor(unIdLivre, unTitre, unResume,unIsbn){
        this.idLivre = unIdLivre;
        this.titre = unTitre;
        this.resume = unResume;
        this.isbn = unIsbn;
    }
    // get titre(){
    //     return this.titre;
    // }
}
module.exports=Livre;