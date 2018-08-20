const {Client} = require('pg');
const Livre = require('../../model/livre');
const Magazine = require('../../model/magazine');
const Document = require('../../model/document');
class DocumentDAOpg{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:Bonjour@192.168.1.34:5432/biblio'
            // connectionString: process.ENV.DATABASE_URL
        });
        this._client.connect(function (err) {
            if(err) return done(err);
        })
    }
    getAllDocument(displaycb){
        const query = {
            name: 'fetch-all-Document',
            text: 'select "idDocument",titre, resume, livre.isbn from document inner join livre on livre."idLivre" = document."idDocument" union select "idDocument",titre, resume, magazine."ISSN" from document inner join magazine on magazine."idMagazine" = document."idDocument";',
        };
        this._client.query(query, function(err, result){
            let lesDocuments = [];
            if (err) {
                console.log(err.stack);
            } else {
                let i = 0;
                result.rows.forEach(function(row) {
                    if(result.rows[i]['isbn'].length===13) {
                        let unDocument = new Livre(result.rows[i]['idDocument'], result.rows[i]['titre'], result.rows[i]['resume'], result.rows[i]['isbn']);
                        lesDocuments.push(unDocument);
                    }
                    else{
                        let unDocument = new Magazine(result.rows[i]['idDocument'], result.rows[i]['titre'], result.rows[i]['resume'], result.rows[i]['isbn'])
                        lesDocuments.push(unDocument);
                    }
                    i++;
                });
                displaycb(lesDocuments);
            }
        });
    };
    getDocumentById(id,displayCB){
        const query={
            name:'fetch-doc-by-id',
            text:'select "idDocument",titre, resume, livre.isbn from document inner join livre on livre."idLivre" = document."idDocument" where "idDocument"=$1 union select "idDocument",titre, resume, magazine."ISSN" from document inner join magazine on magazine."idMagazine" = document."idDocument" where "idDocument"=$1;',
            values:[id]
        };
        this._client.query(query, function (err,result) {
            if(err){
                console.log(err.stack);
            }else{
                if(result.rows[0]['isbn'].length===13) {
                    let unDocument = new Livre(result.rows[0]['idDocument'], result.rows[0]['titre'], result.rows[0]['resume'], result.rows[0]['isbn']);
                    displayCB(unDocument);
                }
                else{
                    let unDocument = new Magazine(result.rows[0]['idDocument'], result.rows[0]['titre'], result.rows[0]['resume'], result.rows[0]['isbn']);
                    displayCB(unDocument);
                }
            }

        })
    }

}

module.exports = DocumentDAOpg;