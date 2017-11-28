const {Client} = require('pg');
const Livre = require('../../model/livre');

class LivreDAOpg{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://postgres:Password1@172.16.4.199:5432/biblio'
            // connectionString: process.ENV.DATABASE_URL
        });
        this._client.connect(function (err) {
            if(err) return done(err);
        })
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
                    let unLivre = new Livre(result.rows[i]['code'], result.rows[i]['titre']);
                    lesLivres.push(unLivre);
                    i++;
                });

                displaycb(lesLivres);

            }

        });

    };
    
}

module.exports = LivreDAOpg;