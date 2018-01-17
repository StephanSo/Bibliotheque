CREATE TABLE auteur (
	"idAuteur" int4 NOT NULL,
	nom varchar NOT NULL,
	prenom varchar NOT NULL,
	"dateDeNaissance" date NOT NULL,
	"dateDeDeces" date NULL,
	PRIMARY KEY ("idAuteur")
);
create sequence seq_num_auteur;


CREATE TABLE livre (
	"idLivre" int4 NOT NULL,
	titre varchar NOT NULL,
	resume text NOT NULL,
	isbn varchar NOT NULL,
	auteur int4 NOT NULL,
	CONSTRAINT livre_pkey PRIMARY KEY ("idLivre"),
	CONSTRAINT livre_un UNIQUE (isbn),
	CONSTRAINT livre_auteur_fkey FOREIGN KEY (auteur) REFERENCES auteur("idAuteur")
);
create sequence seq_num_livre;


CREATE TABLE genre (
	"idGenre" int4 NOT NULL,
	libelle varchar NOT NULL,
	CONSTRAINT genre_pk PRIMARY KEY ("idGenre")
);
create sequence seq_num_genre;

CREATE TABLE appartenir (
	livre int4 NOT NULL,
	genre int4 NOT NULL,
	CONSTRAINT appartenir_pk PRIMARY KEY (livre,genre),
	CONSTRAINT appartenir_genre_fk FOREIGN KEY (genre) REFERENCES genre("idGenre"),
	CONSTRAINT appartenir_livre_fk FOREIGN KEY (livre) REFERENCES livre("idLivre")
);

CREATE TABLE "user" (
	"idUser" int4 NOT NULL,
	username varchar NULL,
	password varchar NULL,
	nom varchar NOT NULL,
	prenom varchar NOT NULL,
	PRIMARY KEY ("idUser")
);
create sequence seq_num_user;

CREATE TABLE bibliothecaire(
	"idBibliotecaire" int4 NOT NULL,
	PRIMARY KEY ("idBibliotecaire"),
	FOREIGN KEY ("idBibliotecaire") REFERENCES "user"("idUser")
);
CREATE TABLE lecteur(
	idlecteur int4 NOT NULL,
	datedenaissance date NOT NULL,
	datepremiereadhesion date NOT NULL,
	datefinadhesion date NULL,
	PRIMARY KEY (idlecteur),
	FOREIGN KEY (idlecteur) REFERENCES "user"("idUser")
);


CREATE TABLE exemplaire (
	numero int4 NOT NULL,
	statut varchar NOT NULL,
	"dateRetour" date NULL,
	livre int4 NOT NULL,
	lecteur int4 NULL,
	CONSTRAINT exemplaire_pk PRIMARY KEY (livre,numero),
	CONSTRAINT exemplaire_lecteur_fk FOREIGN KEY (lecteur) REFERENCES lecteur(idlecteur),
	CONSTRAINT exemplaire_livre_fk FOREIGN KEY (livre) REFERENCES livre("idLivre")
);

/* Triggers*/

create or replace function creerAuteur(nom varchar, prenom varchar,dateDeNaissance date, dateDeDeces date) returns void
as
$$
begin
	insert into auteur values (nextval('seq_num_auteur'),nom,prenom,dateDeNaissance,dateDeDeces);
end; 
$$
language plpgsql;

select creerAuteur('Bowden','Oliver','1948-10-22',null);
select creerAuteur('Leonard','Erika','1963-03-07',null);
select *  from auteur;

create or replace function creerLivre(titre varchar, resume varchar,isbn varchar, auteur int4) returns void
as
$$
begin
	insert into livre values (nextval('seq_num_livre'),titre,resume,isbn, auteur);
end; 
$$
language plpgsql;

select creerLivre('Assassin''s Creed : Renaissance','En 1476, Ezio Auditore est un jeune fils de banquier vivant à Florence amateur de femmes et de bagarre, en constante rivalité avec Vieri de'' Pazzi. Sa vie tranquille va prendre un cours tragique quand, trahi par le gonfalonnier Uberto Alberti, son père et ses deux frères sont envoy�s en prison et condamnés à mort pour trahison. Pour venger sa famille, Ezio va percer les secrets de son p�re et devenir à son tour un Assassin, un guerrier luttant en secret contre les Templiers, qui complotent pour prendre le pouvoir sur les cités-états d''Italie','9782811207243',1 );
SELECT creerLivre('Assassin''s Creed : Brotherhood ','Je vais me rendre au cœur d''un empire corrompu pour anéantir mes ennemis. Rome n''a pas été construite en un jour et ne sera pas conquise par un seul Assassin. Je suis Ezio Auditore et voici ma Confrérie.','9780241951712',1);
select creerLivre('Assassin''s Creed : La Croisade secrète','Ezio Auditore da Firenze, le Mentor de la Confrérie des Assassins du XVIe si�cle, voyage sur la mer M�diterran�e jusqu''en Palestine. Pendant le trajet, il passera son temps à lire le journal de Niccolò Polo relatant le récit de la vie du Mentor Altaïr Ibn-La''Ahad.','9782811206529',1);
select creerLivre('Assassin''s Creed : Revelations','"Quand un homme a gagné toutes ses batailles et défait tous ses ennemis, que lui reste-t-il à accomplir? Ezio Auditore doit tirer un trait sur sa vie passée pour trouver des réponses, pour mener à bien sa quête de vérité. Suivez l''ultime périple d''Ezio à travers Constantinople, centre de l''Empire ottoman et marchez sur les traces de son légendaire ancêtre Altaïr Ibn-La''Ahad. Plongez au plus profond d�une quête remplie de découvertes et de révélations."','9782811207922',1);
select creerLivre('Assassin''s Creed : Forsaken','1735 , Londres. Haytham Kenway a appris à manier l''épée depuis qu''il est capable d''en tenir une. Alors, quand des hommes armés attaquent la demeure familiale, assassinent son père et enlèvent sa sœur, Haytham défend son foyer de la seule manière possible: il tue. Après ce drame, un mystérieux tuteur le prend sous son aile et l''entraîne pour faire de lui un assassin redoutable. Consumé par sa soif de vengeance, Haytham se lance dans une v�ritable vendetta. Il ne se fie à personne et remet en question tout ce qu''il a toujours connu. Conspirations et trahisons l''assailliront de toutes parts tandis qu''il plongera au cœur du conflit séculaire qui oppose les Assassins aux Templiers.','9780718193683',1);
select creerLivre('Assassin''s Creed : Black Flag','C''est l''âge d''or de la piraterie et du Nouveau Monde. Attiré par les promesses de fortune de ces temps troublés, Edward Kenway, fils cabochard d''un marchand de laine, rêve de prendre la mer en quête de gloire. Le jour où la chaumière familiale est attaquée, il juge le moment opportun pour fuir sa vie de misère. Très vite, il devient l''un des plus redoutables pirates de son temps. Mais la convoitise, l''ambition et la traîtrise sévissent dans son sillage et, lorsque Kenway découvre l''existence d''un terrible complot qui menace tout ce qui lui est cher, la vengeance devient son nouveau but. C''est ainsi qu''il va se retrouver propulsé au cœur de la lutte séculaire qui oppose les Assassins et les Templiers.','9782811210823',1);
select creerLivre('Cinquante nuances de Grey','Anastasia Steele accepte de remplacer sa colocataire malade, Katherine, pour interviewer l''homme d''affaires et milliardaire Christian Grey. Jeune PDG séduisant et mystérieux, ce dernier l''intimide. A sa grande surprise, Christian Grey vient la voir au magasin où elle travaille, prétextant des achats. Très attirée par lui, elle se verra rapidement devenir sa soumise. Pour cela un contrat va être rédigé pour permettre de définir les règles de ce jeu dangereux. Cependant, ce contrat devient souvent un sujet tabou et sera changé sans cesse. A mesure que leur relation progresse, la jeune et innocente Ana est confrontée à un tout nouvel univers aux côtés du riche entrepreneur. Christian a cependant une face sombre : il est adepte du BDSM. La jeune femme doit alors décider si elle est prète ou non à entrer dans cet univers.','9782709642521',2);
select *  from livre;


create or replace function creerLecteur(usernam varchar, password varchar,nom varchar,prenom varchar, dateDeNaissance date, dateFinAdhesion date) returns void
as
$$
declare
	nextvale int4;
begin
	select into nextvale nextval('seq_num_user');
	insert into "user" values (nextvale,usernam,password,nom, prenom);
	insert into lecteur values (nextvale,dateDeNaissance, date(now()), dateFinAdhesion);
end; 
$$
language plpgsql;

select creerLecteur('stephansonnois','test','Sonnois','Stéphan','1998-12-10',null);
select creerLecteur('bernardjules','test','Bernard','Jules','2001-05-25',null);
select * from lecteur;
select * from "user";

create or replace function creerBibliothecaire(usernam varchar, password varchar,nom varchar,prenom varchar) returns void
as
$$
declare
	nextvale int4;
begin
	select into nextvale nextval('seq_num_user');
	insert into "user" values (nextvale,usernam,password,nom, prenom);
	insert into bibliothecaire values (nextvale);
end; 
$$
language plpgsql;

select creerBibliothecaire('admin','admin','admin','admin');
select * from "user";

create or replace function creerExemplaire(statut varchar,dateRetour date, livreP int4, lecteur int4) returns void
as
$$
declare
	compteurExemplaire int4;
begin

	select into compteurExemplaire count(*) from exemplaire where livre=livreP;
	if  compteurExemplaire = 0 then
		compteurExemplaire = 1;
	else
		compteurExemplaire =compteurExemplaire+ 1;
	end if;
	insert into exemplaire values(compteurExemplaire, statut, dateRetour, livreP, lecteur);
end;
$$
language plpgsql;

select creerExemplaire('Libre',null, 7, null);
select * from exemplaire;

create or replace function creerGenre(libelle varchar) returns void
as
$$
begin
	insert into genre values(nextval('seq_num_genre'),libelle);
end; 
$$
language plpgsql;

select creerGenre('Fiction Historique');
select creerGenre('Adulte');
select * from genre;


create or replace function ajoutGenreLivre(livre int4, genre int4) returns void
as 
$$
begin
	insert into appartenir values(livre,genre);
end;
$$
language plpgsql;

select ajoutGenreLivre(1,1);
select * from appartenir;

create or replace function rendreLivre(lecteurP int4,livreP int4, numeroP int4) returns void
as
$$
begin
	update exemplaire set lecteur = null, "dateRetour"= null, statut='Libre' where livre = livreP and numero = numeroP;
end; 
$$
language plpgsql;

select rendreLivre(2,7,1);
select * from exemplaire;

create or replace function faireEmprunt(lecteurP int4, livreP int4, numeroP int4) returns void
as
$$
begin
	update exemplaire set lecteur = lecteurp,"dateRetour" =date(now()+interval '3 week'),statut = 'Emprunté' where (livre = livreP and numero = numeroP);
end ;
$$
language plpgsql;

select faireEmprunt(3,1,1);
select * from exemplaire;


create or replace function faireEmprunt() returns trigger 
as 
$$
declare 
	compteurEmprunt int4;
	compteurLivre int4;
	Emprunt exemplaire%rowtype;
	ageLecteur int4;
	genreLivre varchar;
begin
	select into compteurEmprunt count(*) from exemplaire where lecteur = new.lecteur;
	if compteurEmprunt >=5 then
		raise exception 'Le lecteur ne peut pas emprunter plus de 5 livres';
	end if;
	select into compteurLivre count(*) from exemplaire where lecteur = new.lecteur and livre = new.livre;
	if compteurLivre >=1 then 
		raise exception 'Le lecteur ne peut pas emprunter deux fois le meme livre';
	end if;
	for Emprunt in select * from exemplaire where lecteur = new.lecteur loop
		if Emprunt."dateRetour" < date(now()) then 
			raise exception 'Le lecteur a un livre non-rendu et en retard';
		end if;
	end loop;
	select into genreLivre genre.libelle from genre inner join appartenir on "idGenre"=appartenir.genre inner join livre on appartenir.livre = livre."idLivre" where livre."idLivre"=new.livre;
	select into ageLecteur extract(year from age(lecteur.datedenaissance)) from lecteur where lecteur.idlecteur = new.lecteur;
	if genreLivre ='Adulte' then 
		if ageLecteur < 18 then
			raise exception 'Le lecteur doit avoir 18 ans pour ce livre';
		end if;
	end if;
return new;
end ;
$$
language plpgsql;

create trigger trigBeforeEmprunt before update on exemplaire
for each row
execute procedure faireEmprunt();

CREATE OR REPLACE FUNCTION veriflivre() RETURNS trigger
 
AS 
$$
declare
	nbChar int4;
	isbnint int8;
	treizeChar int8;
	somme int;
	i int;
	
begin
	select into nbChar length(new.isbn);
	if nbChar <> 13 then
		raise exception 'L''isbn ne comporte pas 13 chiffre';
	end if;
	
	somme=0;
	for i in 1..12 loop
		if i%2 = 0 then
			 isbnint =  cast(substring(new.isbn from i for 1) as int8);
			somme =somme+(isbnint * 3);		
		else
			isbnint =  cast(substring(new.isbn from i for 1) as int8);
			somme = somme+(isbnint * 1);
		end if;	
	end loop;
	somme=10-(somme%10);
	treizeChar= cast(substring(new.isbn from 13 for 1) as int8);
	if treizeChar != somme then
		raise exception 'l''isbn ne respecte pas la norme 13';
	end if;
	return new;
end; 
$$
LANGUAGE plpgsql


create trigger trigBeforeInsertLivre before insert on livre
for each row 
execute procedure verifLivre();


create or replace function verifAuteur() returns trigger 
as
$$
begin
	new.nom = initcap(new.nom);
	new.prenom = initcap(new.prenom);
	return new;
end;
$$
language plpgsql;

create trigger trigBefInsertAuteur before insert on auteur
for each row
execute procedure verifAuteur();

create or replace function verifUser() returns trigger
as 
$$
begin
	new.nom = initcap(new.nom);
	new.prenom = initcap(new.prenom);
	return new;
end; 
$$
language plpgsql;

create trigger trigBefInsertuser before insert on "user"
for each row
execute procedure verifUser();



/*************/
/*****TP2*****/
/*************/

create table document(
	"idDocument" int4 not null,
	titre varchar not null,
	resume varchar not null,
	primary key ("idDocument")
);
insert into document("idDocument",titre,resume) select livre."idLivre",livre.titre,livre.resume from livre;

alter table livre drop column titre;
alter table livre drop column resume;


ALTER TABLE sonnois.appartenir ADD document int4 NULL ;
ALTER TABLE sonnois.appartenir DROP CONSTRAINT appartenir_pk ;
update appartenir a1
set document = (select a2.livre from appartenir a2
where a1.livre = a2.livre);
ALTER TABLE sonnois.appartenir ALTER COLUMN document SET NOT NULL ;
ALTER TABLE sonnois.appartenir DROP CONSTRAINT appartenir_livre_fk ;
ALTER TABLE sonnois.appartenir DROP COLUMN livre ;
ALTER TABLE sonnois.appartenir ADD CONSTRAINT appartenir_document_fk FOREIGN KEY (document) REFERENCES sonnois.document("idDocument") ;
ALTER TABLE sonnois.appartenir ADD CONSTRAINT appartenir_pk PRIMARY KEY (genre,document) ;

ALTER TABLE sonnois.livre ADD CONSTRAINT livre_document_fk FOREIGN KEY ("idLivre") REFERENCES sonnois.document("idDocument") ;

CREATE TABLE magazine (
	"idMagazine" int4 NOT NULL,
	"ISSN" varchar NOT NULL,
	CONSTRAINT magazine_pk PRIMARY KEY ("idMagazine"),
	CONSTRAINT magazine_un UNIQUE ("ISSN"),
	CONSTRAINT magazine_document_fk FOREIGN KEY ("idMagazine") REFERENCES sonnois.document("idDocument")
);

CREATE TABLE numeromagazine (
	"numeroMagazine" int4 NOT NULL,
	magazine int4 NOT NULL,
	titre varchar NOT NULL,
	"dateDeParution" date NOT NULL,
	statut varchar NOT NULL,
	lecteur int4 NULL,
	dateRetour date NULL,
	CONSTRAINT numeromagazine_pk PRIMARY KEY ("numeroMagazine",magazine),
	CONSTRAINT numeromagazine_magazine_fk FOREIGN KEY (magazine) REFERENCES sonnois.magazine("idMagazine"),
	CONSTRAINT numeromagazine_lecteur_fk FOREIGN KEY (lecteur) REFERENCES sonnois.lecteur(idlecteur)
);

CREATE SEQUENCE seq_num_document
INCREMENT BY 1
MINVALUE 1
MAXVALUE 9223372036854775807
START 7;

create or replace function creerLivre(titre varchar, resume varchar,isbn varchar, auteur int4) returns void
as
$$
declare
	nextvale int4;
begin
	select into nextvale nextval('seq_num_document');
	insert into document values (nextvale,titre,resume);
	insert into livre values (nextvale,isbn, auteur);
end; 
$$
language plpgsql;

select creerLivre('Assassin''s Creed : Unity','1789 : La révolution est aux portes de Paris. Le peuple se dresse contre l''oppression de l''aristocratie, inondant de sang les rues pavées de la capitale. Mais la justice révolutionnaire se paie au prix fort... Alors que les inégalités entre les riches et les pauvres sont à leur paroxysme et que la nation se déchire, un jeune homme et une jeune femme tentent de se venger de tout ce dont on les a privés. Arno et Élise ne tardent pas à se retrouver plongés au beau milieu du conflit qui oppose les Assassins et les Templiers depuis des siècles déjà, dans un monde où les dangers sont plus redoutables qu''ils l''auraient imaginé.','9782820518941',1);

drop function ajoutgenrelivre(livre integer, genre integer);
create or replace function ajoutGenreDocument(genre int4, document int4) returns void
as 
$$
begin
	insert into appartenir values(genre,document);
end;
$$
language plpgsql;
select ajoutGenreDocument(1,9);


create or replace function creerMagazine(titre varchar, resume varchar,issn varchar) returns void
as
$$
declare
	nextvale int4;
begin
	select into nextvale nextval('seq_num_document');
	insert into document values (nextvale,titre,resume);
	insert into magazine values (nextvale,issn);
end; 
$$
language plpgsql;

select creerMagazine('GNU/Linux magazine France',' C''est un magazine spécialisé dans GNU/Linux et les logiciels libres. Il s’adresse principalement à des professionnels ou amateurs éclairés, dans le domaine du logiciel libre et de l''administration de systèmes de type Unix. Les thèmes abordés sont principalement le développement logiciel (présentation de langages de programmation ou de bibliothèques), l''administration système ou réseau,l''actualité du logiciel libre, du noyau Linux, etc','12917834');
select * from magazine;
select * from document;


/*Pour ajouter un numero x*/
create or replace function creerNumeroX(numeroM int4,magazineP int4,titre varchar,dateDeParution date,statut varchar, lecteur int4,dateRetourM date)returns void
as
$$
begin
	insert into numeromagazine values(numeroM, magazineP, titre,dateDeParution,statut, lecteur,dateRetourM);
end;	
$$
language plpgsql;

select creerNumeroX(210, 11,' La chasse aux pirates est ouverte : Mettez en place votre premier Honeypot !','01-12-2017','Libre',null,null);
select * from numeromagazine;

/* pour les emprunts des magazines */ 

create or replace function faireEmpruntMagazine() returns trigger 
as 
$$
declare 
	compteurEmprunt int4;
	Emprunt numeromagazine%rowtype;
	maxmagazine int4;
	genreLivre varchar;
begin
	select into compteurEmprunt count(*) from numeromagazine where lecteur = new.lecteur;
	if compteurEmprunt >=3 then
		raise exception 'Le lecteur ne peut pas emprunter plus de 3 magazine';
	end if;
	for Emprunt in select * from numeromagazine where lecteur = new.lecteur loop
		if Emprunt."dateRetourM" < date(now()) then 
			raise exception 'Le lecteur a un magazine non-rendu et en retard';
		end if;
	end loop;
	select into maxmagazine max("numeroMagazine") from numeromagazine where magazine = new.magazine;
	if maxmagazine = new."numeroMagazine" then
		raise exception 'Le nouveau magazine ne peut pas etre emprunter';
	end if;
return new;
end ;
$$
language plpgsql;

create trigger trigBeforeEmpruntMagazine before update on numeromagazine
for each row
execute procedure faireEmpruntMagazine();

create or replace function faireEmpruntMagazineU(lecteurP int4, magazineP int4, numeroP int4) returns void
as
$$
begin
	update numeromagazine set lecteur = lecteurp,"dateRetourM" =date(now()+interval '2 week'),statut = 'Emprunté' where (magazine = magazinep and "numeroMagazine" = numeroP);
end ;
$$
language plpgsql;

create or replace function rendreMagazine(lecteurP int4,magazineP int4, numeroP int4) returns void
as
$$
begin
	update numeromagazine set lecteur = null, "dateRetourM"= null, statut='Libre' where (magazine = magazinep and "numeroMagazine" = numeroP);
end; 
$$
language plpgsql;


CREATE OR REPLACE FUNCTION verifMagazine() RETURNS trigger
AS 
$$
declare
	nbChar int4;
	issnint int8;
	huitChar int8;
	somme int;
	i int;
	y int;
	
begin
	select into nbChar length(new.ISSN);
	if nbChar <> 8 then
		raise exception 'L''issn ne comporte pas 8 chiffre';
	end if;
	y=8
	somme=0;
	for i in 1..7 loop
		issnint =  cast(substring(new.ISSN from i for 1) as int8);
		somme = somme+ (isbnint*y);
		y = y-1;
	somme=11-(somme%11);
	huitChar= cast(substring(new.ISSN from 8 for 1) as int8);
	if huitChar != somme then
		raise exception 'l''isbn ne respecte pas la norme ISSN';
	end if;
	return new;
end; 
$$
LANGUAGE plpgsql

create trigger trigBeforeInsertMagazine before insert on magazine
for each row 
execute procedure verifMagazine();