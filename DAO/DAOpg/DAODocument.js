const {Client} = require('pg');
const Livre = require('../../model/livre');
const Magazine = require('../../model/magazine');
class DocumentDAOpg{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:sonnois@192.168.222.86:5432/biblio'
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


}

module.exports = DocumentDAOpg;