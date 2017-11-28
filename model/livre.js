class Livre{
    constructor(unCode, unTitre, unResume,unIsbn){
        this._code = unCode;
        this._titre = unTitre;
        this._resume = unResume;
        this._isbn = unIsbn;
    }
    get titre(){
        return this._titre;
    }
}
module.exports=Livre;