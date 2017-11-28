class Livre{
    constructor(unCode, unTitre){
        this._code = unCode;
        this._titre = unTitre;
    }
    get titre(){
        return this._titre;
    }
}
module.exports=Livre;