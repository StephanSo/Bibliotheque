const {Client} = require('pg');
const Magazine = require('../../model/magazine');
const NumeroMagazine = require('../../model/numeroMagazine');

class MagazineDAOpg {
    constructor() {
        this._client = new Client({
            connectionString: 'postgres://sonnois:Bonjour@192.168.1.34:5432/biblio'
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
                let i =0;
                result.rows.forEach(function() {
                    let unNumero = new NumeroMagazine(result.rows[i]['numeroMagazine'],result.rows[i]['magazine'],result.rows[i]['titre'],result.rows[i]['dateDeParution'],result.rows[i]['statut'],result.rows[i]['lecteur'], result.rows[i]['dateRetourM']);
                    lesNumeros.push(unNumero);
                    i++;
                });
                cb(lesNumeros);

            }


        })
    }
}



module.exports = MagazineDAOpg;