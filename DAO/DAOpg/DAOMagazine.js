const {Client} = require('pg');
const Magazine = require('../../model/magazine');

class MagazineDAOpg {
    constructor() {
        this._client = new Client({
            connectionString: 'postgres://sonnois:sonnois@192.168.222.86:5432/biblio'
            // connectionString: process.ENV.DATABASE_URL
        });
        this._client.connect(function (err) {
            if (err) return err;
        })
    }
    getLesNumerosByMagazineId(id,cb){
        const query = {
            name: 'fetch-all-exemplaire-by-id',
            text: 'SELECT * FROM numeromagazine where magazine =$1',
            values:[id]
        };
        this._client.query(query, function (err, result) {
            let lesNumeros=[];
            if(err){
                console.log(err.stack);
            }
            else{
                result.rows.forEach(function() {
                    let unNumero = new E(result.rows[i]['numero'],result.rows[i]['statut'],result.rows[i]['dateRetour'],result.rows[i]['livre'],result.rows[i]['lecteur']);
                    lesExemplaire.push(unExemplaire);
                    i++;
                });

            }


        })
    }
}



module.exports = MagazineDAOpg;