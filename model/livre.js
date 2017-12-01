class Livre{
    constructor(unCode, unTitre, unResume,unIsbn){
        this.code = unCode;
        this.titre = unTitre;
        this.resume = unResume;
        this.isbn = unIsbn;
    }
    // get titre(){
    //     return this.titre;
    // }
}
module.exports=Livre;