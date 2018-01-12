const Document =  require('../model/document');

class Livre extends Document{
    constructor(id, titre, resume,unIsbn){
        super(id,titre,resume);
        this.isbn = unIsbn;
    }
}
module.exports=Livre;