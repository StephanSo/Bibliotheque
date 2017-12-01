const {Client} = require('pg');
const Livre = require('../../model/livre');

class DAOAndroid{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:sonnois@192.168.222.86:5432/biblio'
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
                    let unLivre = new Livre(result.rows[i]['code'], result.rows[i]['titre'],result.rows[i]['resume'], result.rows[i]['isbn']);
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
            text:'select * from livre where code =$1',
            values:[id]
        }
        this._client.query(query, function (err,result) {
            if(err){
                console.log(err.stack);
            }else{
                let leLivre = new Livre(id, result.rows[0]['titre'], result.rows[0]['resume'], result.rows[0]['isbn']);
                cb(leLivre)
            }

        })
    }
}

module.exports = DAOAndroid;