const {Client} = require('pg');
const Users = require('../../model/user');

class DAOUser{
    constructor(){
        this._client = new Client({
            connectionString: 'postgres://sonnois:Bonjour@192.168.1.34:5432/biblio'
            // connectionString : process.ENV.DATABASE_URL
        });

        this._client.connect(function (err){
            if (err) return done(err);
        });
    }

    getUser(cb){
        const query = {
            name:'fetch-all-user',
            text:'select * from "user"',
        };
        this._client.query(query, function(err,result){
            let lesUsers = [];
            if(err){
                console.log(err.stack);
            }else{
                let i=0;
                result.rows.forEach(function () {

                    let unUser = new Users(result.rows[i]['idUser'], result.rows[i]['username'], result.rows[i]['password']);
                    lesUsers.push(unUser);
                    i++;
                });

            }
            cb(lesUsers);
        })

    }
    checkRole(username,cb){
        const query = {
            name:'fetch-role-by-username',
            text:'select count(*) from "user" u inner join lecteur l on l.idlecteur = u."idUser" where username = $1',
            values: [username]
        };
        this._client.query(query, function(err,result){
            let role="";
            if(err){
                console.log(err.stack);
            }else{

                result.rows.forEach(function () {
                    if(result.rows[0]['count'] == 1){
                        role="Lecteur";
                    }
                    else{
                        role="bibliothécaire";
                    }
                });
                cb(role);
            }

        });
    }
    loginUser(usernameP, passwordP, cb) {
        let userC;

        this.getUser(function (listUsers) {
                let i =0;

                while(i<listUsers.length && userC !=="ok")
                {
                    if(usernameP === listUsers[i]._username){
                        if(passwordP ===listUsers[i]._password){
                            console.log('CONNEXION');
                            userC="ok";

                        }else{
                            console.log('nonOk');
                            userC="mdpfalse";
                        }
                    }
                    else{
                        console.log('nonOk')
                        userC="usernamefalse";
                    }
                    i++;
                }


                cb(userC)
            }
        );
    }

}
module.exports = DAOUser;