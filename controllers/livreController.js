const LivreDAOpg = require('../DAO/DAOpg/DAOLivre');
const livreDAOpg = new LivreDAOpg();
const AuteurDAOpg = require('../DAO/DAOpg/DAOAuteur');
const auteurDAOpg = new AuteurDAOpg();
const ExemplaireDAOpg = require('../DAO/DAOpg/DAOExemplaire');
const exemplaireDAOpg = new ExemplaireDAOpg();
const LecteurDAOpg = require('../DAO/DAOpg/DAOLecteur');
const lecteurDAOpg = new LecteurDAOpg();
const GenreDAOpg = require('../DAO/DAOpg/DAOGenre');
const genreDAOpg = new GenreDAOpg();

// exports.livreById = function (req, res, next) {
//     let id = req.params.id;
//     livreDAOpg.getLivreById(id,
//         function (leLivre) {
//         auteurDAOpg.getAuteurByIdLivre(id,
//             function (lAuteur) {
//                 res.render('catalogue/documents/livreDetail',{id, unLivre:leLivre, unAuteur: lAuteur,user:req.session.user, role:req.session.role})
//             })
//         });
// };
// exports.exemplaireBylivreId = function (req, res, next) {
//     let id = req.params.id;
//     exemplaireDAOpg.getAllExemplaireByIdLivre(id, function (lesExemplaire) {
//         console.log(req.session);
//         res.render('catalogue/documents/exemplaireLivre', {
//             listeExemplaire: lesExemplaire,
//             user: req.session.user,
//             role: req.session.role
//         });
//
//     })
// };
// exports.exemplaireByNumeroByLivreId = function (req, res , next) {
//     let id = req.params.id;
//     let numero = req.params.numero;
//     exemplaireDAOpg.getExemplaireByNumeroAndId(id, numero, function (lExemplaire) {
//         livreDAOpg.getLivreById(id, function (leLivre) {
//             lecteurDAOpg.getLecteurById(lExemplaire.lecteur, function (leLecteur) {
//                 res.render('catalogue/documents/unExemplaireLivre',{lexemplaire: lExemplaire,livre:leLivre,lecteur:leLecteur, user: req.session.user,role: req.session.role});
//
//             })
//         })
//
//
//     })
//
// };
exports.affichePageAddLivre = function (req,res,next) {
    auteurDAOpg.getAllAuteur(function (lesAuteurs) {
        genreDAOpg.getAllGenre(function (lesGenres) {
            res.render('catalogue/documents/ajoutLivre',{listGenre:lesGenres,listAuteur:lesAuteurs,user: req.session.user,role: req.session.role});

        });

    });
};

exports.ajoutLivre = function (req,res,next){
    titre= req.body.titre;
    resume= req.body.resume;
    isbn = req.body.isbn;
    auteur= req.body.auteur;
    genre= req.body.genre;
            livreDAOpg.ajoutLivre(titre,resume,isbn,auteur, function (verif) {
                if(verif === 'erreur'){
                    let Erreur = 'Le document ne s\'est pas ajouté';
                    auteurDAOpg.getAllAuteur(function (lesAuteurs) {
                        genreDAOpg.getAllGenre(function (lesGenres) {

                            res.render('catalogue/documents/ajoutLivre',{listGenre:lesGenres,listAuteur:lesAuteurs,erreur:Erreur,user: req.session.user,role: req.session.role});

                        });

                    });
                }
                else{
                    livreDAOpg.getLivreIdByTitre(titre,function (lIdDuLivre) {
                        console.log('test',lIdDuLivre);
                       livreDAOpg.ajoutGenre(lIdDuLivre.idDocument, genre, function (verifGenre) {
                            if(verifGenre=='erreur'){
                                let ErreurGenre='Le Genre n\'as pas été ajouter correctement';
                                auteurDAOpg.getAllAuteur(function (lesAuteurs) {
                                    genreDAOpg.getAllGenre(function (lesGenres) {

                                        res.render('catalogue/documents/ajoutLivre',{listGenre:lesGenres,listAuteur:lesAuteurs,erreur:ErreurGenre,user: req.session.user,role: req.session.role});

                                    });

                                });
                            }
                            else{
                                let ok = 'Le documents a bien été ajouter';
                                auteurDAOpg.getAllAuteur(function (lesAuteurs) {
                                    genreDAOpg.getAllGenre(function (lesGenres) {
                                        res.render('catalogue/documents/ajoutLivre',{listGenre:lesGenres,listAuteur:lesAuteurs, valid:ok,user: req.session.user,role: req.session.role});

                                    });

                                });
                            }
                       });
                    });


                }
            });
};

exports.affichePageAddExemplaire = function (req, res, next) {
    livreDAOpg.getAllLivres(function (lesLivres) {
        res.render('catalogue/documents/ajoutExemplaire',{listLivres:lesLivres,user: req.session.user,role: req.session.role});
    })
};

exports.ajoutExemplaire = function (req, res, next) {
    idLivre = req.body.livre;
    nombreE = req.body.nombre;
    let valid;
    livreDAOpg.getAllLivres(function (lesLivres) {
            livreDAOpg.ajoutExemplaire(idLivre, nombreE, function (verification) {
                if(verification=='erreur'){
                    valid='Les exemplaires se sont mal ajoutés';
                    res.render('catalogue/documents/ajoutExemplaire',{listLivres:lesLivres,user: req.session.user,role: req.session.role, nombr:nombreE, erreur:valid})
                }
                else{
                    valid='les exemplaires se sont correctement ajouter';
                    res.render('catalogue/documents/ajoutExemplaire',{listLivres:lesLivres,user: req.session.user,role: req.session.role, nombr:nombreE, validation:valid})
                }
            })


    });
};



