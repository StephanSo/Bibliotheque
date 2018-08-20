const {Client} = require('pg');
const Genre = require('../../model/genre');

class GenreDAOpg{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:Bonjour@192.168.1.34:5432/biblio'
            // connectionString: process.ENV.DATABASE_URL
        });
        this._client.connect(function (err) {
            if(err) return done(err);
        })
    }
    getGenreByLibelle(genre, cb){
        const query={
            name:'fetch-genre-by-libelle',
            text:'select genre."idGenre" from genre where libelle= $1;',
            values:[genre]
        };
        this._client.query(query,function (err,result) {
            if(err){
                console.log(err.stack);
            }else{
                let leGenre = new Genre(result.rows[0]['idGenre']);
                cb(leGenre);
            }
        })
    }
    getAllGenre(cb){
        const query={
            name:'fetch-all-genre',
            text:'select * from genre',
        };
        this._client.query(query, function (err,result) {
            let lesGenres = [];
            if(err){
                console.log(err.stack);
            }else{
                let i = 0;
                result.rows.forEach(function() {
                    let leGenre = new Genre(result.rows[i]['idGenre'], result.rows[i]['libelle']);
                    lesGenres.push(leGenre);
                    i++;
                });
                cb(lesGenres);
            }

        })
    }

}

module.exports=GenreDAOpg;
