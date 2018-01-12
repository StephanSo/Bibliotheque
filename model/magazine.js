const Document =  require('../model/document');

class Magazine extends Document{
    constructor(id, titre, resume,unIssn){
        // noinspection JSAnnotator
        super(id,titre,resume);
        this.issn = unIssn;
    }
}
module.exports=Magazine;