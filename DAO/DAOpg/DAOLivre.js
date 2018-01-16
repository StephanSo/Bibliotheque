const {Client} = require('pg');
const Livre = require('../../model/livre');
const Magazine = require('../../model/magazine');
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
            name: 'fetch-all-documents',
            text: 'select "idDocument",titre, resume, livre.isbn from document inner join livre on livre."idLivre" = document."idDocument";',
        };

        this._client.query(query, function(err, result){
            let lesDocuments = [];
            if (err) {
                console.log(err.stack);
            } else {
                let i = 0;
                result.rows.forEach(function(row) {
                        let unDocument = new Livre(result.rows[i]['idDocument'], result.rows[i]['titre'], result.rows[i]['resume'], result.rows[i]['isbn']);
                        lesDocuments.push(unDocument);

                    i++;
                });

                displaycb(lesDocuments);

            }

        });

    };
    // getLivreById(id,cb){
    //     const query={
    //         name:'fetch-documents-by-id',
    //         text:'select * from documents where "idLivre" =$1',
    //         values:[id]
    //     };
    //     this._client.query(query, function (err,result) {
    //         if(err){
    //             console.log(err.stack);
    //         }else{
    //             let leLivre = new Livre(id, result.rows[0]['titre'], result.rows[0]['resume'], result.rows[0]['isbn']);
    //             cb(leLivre)
    //         }
    //
    //     })
    // }
    getLivreIdByTitre(titre,cb){
        const query = {
            name:'fetch-livreid-by-titre',
            text:'select document."idDocument" from document where titre=$1',
            values:[titre]
        };
        this._client.query(query,function (err,result) {
            if(err){
                console.log(err.stack);

            }else{
                let leLivre = new Livre(result.rows[0]['idDocument']);
                cb(leLivre);
            }
        })
    }
    ajoutGenre(idLivre, idgenre,cb){
        const query = 'select ajoutGenreDocument($1,$2)';
        const values=[idgenre,idLivre];
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
    ajoutExemplaire(idLivre,nombre, cb){
        const query='select creerExemplaire(\'Libre\', null, $1, null)';
        const values=[idLivre];
        let ajoutverif;
        let i = 0;
        while(i < nombre){
            this._client.query(query,values, function (err, result) {
                if(err){
                    console.log(err.stack);
                    ajoutverif='erreur';
                    cb(ajoutverif);
                }
                else{
                    console.log(result.rows[0]);
                    ajoutverif='ok'

                }
            })
            i++;
        }
        cb('ok');
    }

}

module.exports = LivreDAOpg;