const {Client} = require('pg');
const Auteur = require('../../model/auteur');

class AuteurDAOpg{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:sonnois@192.168.222.86:5432/biblio'
            // connectionString: process.ENV.DATABASE_URL
        });
        this._client.connect(function (err) {
            if(err) return done(err);
        })
    }
    getAuteurByNom(auteur, cb){
        const query={
            name:'fetch-auteur-by-nom',
            text:'select auteur."idAuteur" from auteur where nom=$1',
            values:[auteur]
        };
        this._client.query(query,function (err,result) {
            if(err){
                console.log(err.stack);
            }else{
                let lAuteur = new Auteur(result.rows[0]['idAuteur']);
                cb(lAuteur);
            }
        })
    }
    getAuteurByIdLivre(id,cb){
        const query={
            name:'fetch-auteur-by-idLivre',
            text:'select auteur.* from auteur inner join livre on auteur."idAuteur" = livre.auteur where livre."idLivre"=$1;',
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
    getAllAuteur(cb){
        const query={
            name:'fetch-all-auteur',
            text:'select * from auteur',
        };
        this._client.query(query, function (err,result) {
            let lesAuteurs = [];
            if(err){
                console.log(err.stack);
            }else{
                let i = 0;
                result.rows.forEach(function() {
                    let lAuteur = new Auteur(result.rows[i]['idAuteur'], result.rows[i]['nom'], result.rows[i]['prenom'], result.rows[i]['dateDeNaissance'], result.rows[i]['dateDeDeces']);
                    lesAuteurs.push(lAuteur);
                    i++;
                });
                cb(lesAuteurs);
            }

        })
    }


}

module.exports = AuteurDAOpg;