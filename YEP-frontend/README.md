# Projet Meazay
Year-End Project à Epitech

### Installation
Téléchargement et installation des dépendances :
```sh
git clone git@github.com:EpitechMscProPromo2024/T-YEP-600-PAR-6-1-finalproject-nathan.danel.git
ou
git clone https://github.com/EpitechMscProPromo2024/T-YEP-600-PAR-6-1-finalproject-nathan.danel.git
cd T-YEP-600-PAR-6-1-finalproject-nathan.danel.git
npm install
```

### Configuration
#### Etape 1 - BDD
Créer une base de données nommée `meazay` et accessible par défaut sur le port 3306
#### Etape 2 - .env
Créer le fichier .env à la racine du projet
Configurer le .env avec vos paramètres de connexion
```env
DATABASE_URL="mysql://<USER>:<PASSWORD>@localhost:3306/meazay"
JWT_PRIVATE_KEY=helpers/lib/keys/private.pem
JWT_PUBLIC_KEY=helpers/lib/keys/public.pem
JWT_PASSPHRASE=<Votre passphrase>
NODE_ENV=development
```
#### Etape 3 - Génération des clés RSA
```sh
openssl genrsa -out private.pem 4096
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```
#### Etape 4 - Prima
```sh
npx prisma db pull
npx prisma generate
```

### Lancer l'application
Mode dev : `npm run dev`
Mode production :
```sh
npm run build
npm start
```