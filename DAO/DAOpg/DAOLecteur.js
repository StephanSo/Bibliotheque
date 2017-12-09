const {Client} = require('pg');
const Lecteur = require('../../model/lecteur');

class LecteurDAOpg{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:Bonjour@192.168.1.26:5432/biblio'
            // connectionString: process.ENV.DATABASE_URL
        });
        this._client.connect(function (err) {
            if(err) return done(err);
        })
    }

    getLecteurById(id, cb){
        const query = {
            name: 'fetch-all-exemplaire-by-id-livre-and-numero',
            text: 'SELECT * FROM lecteur where idlecteur =$1',
            values:[id],
        };
        this._client.query(query, function(err, result){
            if (err) {
                console.log(err.stack);
            } else {
                result.rows.forEach(function() {
                    let unLecteur = new Lecteur(result.rows[0]['idLecteur'],result.rows[0]['nom'],result.rows[0]['prenom']);
                    cb(unLecteur);
                });

            }

        });
    }


}

module.exports = LecteurDAOpg;