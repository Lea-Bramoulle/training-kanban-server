Setup database postgres :

Créer role :
CREATE ROLE <user_name> WITH LOGIN PASSWORD 'pwd';

Editer rôle :
ALTER ROLE <user_name> WITH
SUPERUSER
CREATEDB
CREATEROLE
INHERIT
LOGIN
PASSWORD 'new_password'
VALID UNTIL '2022-05-14';

Créer Databse :
CREATE DATABASE <db_name> OWNER <user_name>;

Créer tables :
psql -U nomDeLutilisateur -d nomDeLaBase -f chemin/du/fichier.sql
