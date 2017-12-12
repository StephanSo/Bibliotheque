const {Client} = require('pg');
const Livre = require('../../model/livre');

class LivreDAOpg{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:sonnois@192.168.222.86:5432/biblio'
            // connectionString: process.ENV.DATABASE_URL
        });
        this._client.connect(function (err) {
            if(err) return done(err);
        })
    }

    ajoutLivre(titre,resume,isbn,auteurId, cb){
        const query = 'select creerLivre($1,$2,$3,$4)';
        const values=[titre, resume, isbn, auteurId];
        let verif;
        this._client.query(query,values,function (err, result) {
            if(err){
                console.log(err.stack);
                verif ='erreur'
            }
            else{

                console.log(result.rows[0]);
                verif='ok'
            }
            cb(verif);
        });
    }
    getAllLivres(displaycb){

        const query = {
            name: 'fetch-all-livre',
            text: 'SELECT * FROM livre',
        };

        this._client.query(query, function(err, result){
            let lesLivres = [];
            if (err) {
                console.log(err.stack);
            } else {
                let i = 0;
                result.rows.forEach(function(row) {
                    let unLivre = new Livre(result.rows[i]['idLivre'], result.rows[i]['titre']);
                    lesLivres.push(unLivre);
                    i++;
                });

                displaycb(lesLivres);

            }

        });

    };
    getLivreById(id,cb){
        const query={
            name:'fetch-livre-by-id',
            text:'select * from livre where "idLivre" =$1',
            values:[id]
        };
        this._client.query(query, function (err,result) {
            if(err){
                console.log(err.stack);
            }else{
                let leLivre = new Livre(id, result.rows[0]['titre'], result.rows[0]['resume'], result.rows[0]['isbn']);
                cb(leLivre)
            }

        })
    }
    getLivreIdByTitre(titre,cb){
        const query = {
            name:'fetch-livreid-by-titre',
            text:'select livre."idLivre" from livre where titre=$1',
            values:[titre]
        };
        this._client.query(query,function (err,result) {
            if(err){
                console.log(err.stack);

            }else{
                let leLivre = new Livre(result.rows[0]['idLivre']);
                cb(leLivre);
            }
        })
    }
    ajoutGenre(idLivre, idgenre,cb){
        const query = 'select ajoutGenreLivre($1,$2)';
        const values=[idLivre,idgenre];
        let verifGenre;
        this._client.query(query,values, function (err, result) {
            if(err){
                console.log(err.stack);
                verifGenre='erreur'
            }
            else{
                console.log(result.rows[0]);
                verifGenre='ok';
            }
            cb(verifGenre);
        })
    }

}

module.exports = LivreDAOpg;