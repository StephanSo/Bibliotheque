const {Client} = require('pg');
const Auteur = require('../../model/auteur');

class LivreDAOpg{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:Bonjour@192.168.1.26:5432/biblio'
            // connectionString: process.ENV.DATABASE_URL
        });
        this._client.connect(function (err) {
            if(err) return done(err);
        })
    }
    getAuteurByIdLivre(id,cb){
        const query={
            name:'fetch-auteur-by-idLivre',
            text:'select auteur.* from auteur inner join livre on auteur."idAuteur" = livre.auteur where livre."idLivre"=$1',
            values:[id]
        }
        this._client.query(query, function (err,result) {
            if(err){
                console.log(err.stack);
            }else{
                let lAuteur = new Auteur(result.rows[0]['idAuteur'], result.rows[0]['nom'], result.rows[0]['prenom'], result.rows[0]['dateDeNaissance'], result.rows[0]['dateDeDeces']);
                cb(lAuteur);
            }

        })
    }


}

module.exports = LivreDAOpg;