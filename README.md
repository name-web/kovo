# Kovo API

Backend de l'application **Kovo**, développé avec NestJS, PostgreSQL et Prisma.

L'API fournit notamment la gestion des utilisateurs et l'authentification JWT.

## Stack technique

* **Node.js 24**
* **NestJS**
* **TypeScript**
* **PostgreSQL**
* **Prisma ORM**
* **JWT**
* **Passport**
* **Swagger**
* **Docker**
* **Render**

## Architecture

```text
src/
├── common/
│   └── decorators/
│       └── current-user.decorator.ts
│
├── config/
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── validation.config.ts
│
├── database/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── guards/
│   │   ├── strategies/
│   │   └── dto/
│   │
│   └── user/
│       ├── user.controller.ts
│       ├── user.service.ts
│       ├── repositories/
│       ├── dto/
│
├── app.controller.ts
├── app.module.ts
└── main.ts

prisma/
├── migrations/
└── schema.prisma

Dockerfile
docker-compose.yml
prisma.config.ts
```

## Installation

Cloner le projet puis installer les dépendances :

```bash
git clone <URL_DU_REPOSITORY>
cd kovo
npm install
```

## Variables d'environnement

Créer un fichier `.env` à la racine du projet.

Exemple :

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
JWT_SECRET="votre_secret_jwt"
PORT=3000
```

### Variables principales

| Variable       | Description                               |
| -------------- | ----------------------------------------- |
| `DATABASE_URL` | URL de connexion PostgreSQL               |
| `JWT_SECRET`   | Secret utilisé pour signer les tokens JWT |
| `PORT`         | Port utilisé par l'application            |

> Les valeurs réelles des variables d'environnement ne doivent jamais être commitées dans Git.

## Base de données

Kovo utilise **PostgreSQL** avec **Prisma ORM**.

### Générer Prisma Client

```bash
npx prisma generate
```

### Vérifier l'état des migrations

```bash
npx prisma migrate status
```

### Appliquer les migrations en production

```bash
npx prisma migrate deploy
```

### Créer une migration en développement

```bash
npx prisma migrate dev
```

Les migrations actuellement présentes sont :

```text
20260806223104_init_user_table
20260807113920_make_name_required
```

## Développement local

Lancer l'application :

```bash
npm run start:dev
```

L'API est alors disponible sur :

```text
http://localhost:3000
```

Le préfixe global de l'API est :

```text
/api
```

### Health check

```text
GET /api
```

Réponse :

```json
{
  "message": "Kovo API is running"
}
```

## Authentification

L'API utilise **JWT Bearer Authentication**.

Après une connexion réussie, l'API retourne un `access_token`.

Le token doit ensuite être envoyé dans l'en-tête HTTP :

```http
Authorization: Bearer <ACCESS_TOKEN>
```

## API Utilisateur

### Inscription

```http
POST /api/user/register
```

Exemple :

```json
{
  "name": "Kamal",
  "email": "kamal@example.com",
  "password": "motDePasse123"
}
```

Réponse :

```json
{
  "id": "uuid",
  "name": "Kamal",
  "email": "kamal@example.com",
  "createdAt": "2026-08-08T14:40:52.872Z",
  "updatedAt": "2026-08-08T14:40:52.872Z"
}
```

### Récupérer le profil

```http
GET /api/user/profile
```

Authentification requise :

```http
Authorization: Bearer <ACCESS_TOKEN>
```

### Modifier le profil

```http
PUT /api/user/profile
```

Authentification requise.

Exemple :

```json
{
  "name": "Kamal Test"
}
```

## API Authentification

### Connexion

```http
POST /api/auth/login
```

Exemple :

```json
{
  "email": "kamal@example.com",
  "password": "motDePasse123"
}
```

Réponse :

```json
{
  "access_token": "<JWT_TOKEN>",
  "user": {
    "id": "uuid",
    "name": "Kamal",
    "email": "kamal@example.com"
  }
}
```

## Swagger

La documentation interactive Swagger est disponible en ligne :

**https://kovo-1g6s.onrender.com/docs**

Elle permet notamment de :

* consulter les endpoints ;
* voir les DTO et leurs champs ;
* tester les requêtes ;
* renseigner le JWT avec **Authorize** ;
* tester les endpoints protégés.

## Docker

Construire l'image :

```bash
docker build -t kovo-api .
```

Lancer le conteneur :

```bash
docker run -p 3000:3000 --env-file .env kovo-api
```

Pour l'environnement de développement avec Docker Compose :

```bash
docker compose up --build
```

## Déploiement

L'API est actuellement déployée sur **Render**.

URL de production :

**https://kovo-1g6s.onrender.com**

Health check :

**https://kovo-1g6s.onrender.com/api**

Documentation Swagger :

**https://kovo-1g6s.onrender.com/docs**

Les variables d'environnement de production, notamment `DATABASE_URL` et `JWT_SECRET`, sont configurées directement dans l'environnement Render.

## Tests

Tests unitaires :

```bash
npm run test
```

Tests end-to-end :

```bash
npm run test:e2e
```

Coverage :

```bash
npm run test:cov
```

## Commandes utiles

```bash
# Développement
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Prisma Client
npx prisma generate

# Statut des migrations
npx prisma migrate status

# Migrations production
npx prisma migrate deploy

# Formatage Prisma
npx prisma format
```

## Licence

Projet Kovo.
