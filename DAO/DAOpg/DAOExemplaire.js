const {Client} = require('pg');
const Exemplaire = require('../../model/exemplaire');

class ExemplaireDAOpg{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:sonnois@192.168.222.86:5432/biblio'
            // connectionString: process.ENV.DATABASE_URL
        });
        this._client.connect(function (err) {
            if(err) return done(err);
        })
    }
    getAllExemplaireByIdLivre(id,displaycb){

        const query = {
            name: 'fetch-all-exemplaire-by-id-livre',
            text: 'SELECT * FROM exemplaire where livre =$1',
            values:[id]
        };

        this._client.query(query, function(err, result){
            let lesExemplaire = [];
            if (err) {
                console.log(err.stack);
            } else {
                let i = 0;
                result.rows.forEach(function() {
                    let unExemplaire = new Exemplaire(result.rows[i]['numero'],result.rows[i]['statut'],result.rows[i]['dateRetour'],result.rows[i]['livre'],result.rows[i]['lecteur']);
                    lesExemplaire.push(unExemplaire);
                    i++;
                });

                displaycb(lesExemplaire);

            }

        });

    }
    getExemplaireByNumeroAndId(id, numero, cb){
        const query = {
            name: 'fetch-all-exemplaire-by-id-livre-and-numero',
            text: 'SELECT * FROM exemplaire where livre =$1 and numero = $2',
            values:[id, numero]
        };
        this._client.query(query, function(err, result){
            if (err) {
                console.log(err.stack);
            } else {
                result.rows.forEach(function() {
                    let unExemplaire = new Exemplaire(result.rows[0]['numero'],result.rows[0]['statut'],result.rows[0]['dateRetour'],result.rows[0]['livre'],result.rows[0]['lecteur']);
                    cb(unExemplaire);
                });

            }

        });
    }

}

module.exports = ExemplaireDAOpg;