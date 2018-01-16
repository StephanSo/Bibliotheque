const {Client} = require('pg');
const Lecteur = require('../../model/lecteur');

class LecteurDAOpg{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:sonnois@192.168.222.86:5432/biblio'
            // connectionString: process.ENV.DATABASE_URL
        });
        this._client.connect(function (err) {
            if(err) return done(err);
        })
    }

    getLecteurById(id, cb){
        const query = {
            name: 'fetch-all-lecteur-by-id',
            text: 'select * from "user" inner join lecteur on "user"."idUser"= lecteur.idlecteur where idlecteur=$1',
            values:[id],
        };
        this._client.query(query, function(err, result){
            if (err) {
                console.log(err.stack);
            } else {
                result.rows.forEach(function() {
                    let unLecteur = new Lecteur(result.rows[0]['idLecteur'],null,null,result.rows[0]['nom'],result.rows[0]['prenom'],result.rows[0]['dateDeNaissance'],result.rows[0]['dateDePremiereadhesion'],result.rows[0]['dateFinAdhesion']);
                    cb(unLecteur);
                });

            }

        });
    }


}

module.exports = LecteurDAOpg;