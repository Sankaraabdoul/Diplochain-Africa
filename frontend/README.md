# VeriTrust

## Certification Académique sur Hedera Hashgraph

> Des diplômes infalsifiables pour une éducation de confiance en Afrique

**Application en ligne :** https://veritrust-1.onrender.com

**Backend API :** https://veritrust-dozy.onrender.com

---

## Important - Première Utilisation

En raison du mode gratuit de Render, les serveurs se mettent en veille après 15 minutes d'inactivité.

**Procédure d'accès recommandée :**

1. **Activer le backend d'abord** : Ouvrez https://veritrust-dozy.onrender.com
   - Attendez 30-60 secondes que le serveur démarre
   - Vous verrez un message JSON confirmant que l'API est active
   
2. **Accédez ensuite au frontend** : https://veritrust-1.onrender.com
   - L'application fonctionnera correctement
   - Toutes les fonctionnalités seront disponibles

**Note :** Après la première activation, l'application reste rapide pendant 15 minutes d'utilisation.

---

## Problématique

La fraude aux diplômes en Afrique est un fléau majeur :
- **150 000+** faux diplômes détectés chaque année en Afrique de l'Ouest
- Coût économique : Perte de productivité, incompétence dans des postes critiques (santé, éducation, ingénierie)
- Processus de vérification : **2-4 semaines**, coûteux (**50-200€**), peu fiable
- **60%** des employeurs ont déjà recruté un candidat avec un faux diplôme
- Mobilité étudiante entravée par la difficulté de faire reconnaître ses diplômes dans un autre pays africain

### Conséquences dramatiques
- Médecins non qualifiés opérant des patients
- Ingénieurs incompétents construisant des infrastructures
- Enseignants sans formation réelle
- Perte de confiance généralisée dans le système éducatif africain

---

## Notre Solution

**VeriTrust** est une plateforme basée sur Hedera Hashgraph permettant aux universités africaines d'émettre des **diplômes numériques infalsifiables** vérifiables instantanément via smartphone.

### MVP (Minimum Viable Product) - Fonctionnalités Actuelles

**Pour les Universités**
- Authentification sécurisée avec email et mot de passe
- Interface d'émission de diplômes avec upload PDF
- Hash SHA-256 automatique du document original
- Création de Soulbound Token (SBT) sur Hedera Hashgraph
- Génération automatique de QR Code pour chaque diplôme
- Dashboard avec statistiques et historique des diplômes émis

**Pour les Employeurs et le Public**
- Vérification instantanée en scannant le QR Code avec smartphone
- Compatible tous appareils (iOS, Android, PC)
- Résultat immédiat : Authentique ou Frauduleux
- Accès aux détails complets du diplôme
- Lien direct vers l'explorateur Hedera pour consultation de la transaction

**Caractéristiques Techniques**
- **Vérification mobile** : Scan QR Code fonctionnel sur smartphone
- **Rapidité** : Vérification en moins de 3 secondes
- **Coût minimal** : 0.0006€ par transaction sur Hedera
- **Sécurité maximale** : Données immuables sur Hedera Hashgraph
- **Éco-responsable** : Hedera est carbon-negative
- **Déployé en production** : Application accessible en ligne via Render

---

## Architecture Technique

### Stack Technologique

**Hedera Hashgraph (DLT)**
- Distributed Ledger Technology de niveau entreprise
- Transactions ultra-rapides (< 3 secondes)
- Finalité absolue (pas de forks possibles)
- Coût minimal (~0.0001 HBAR par transaction)
- Algorithme de consensus Hashgraph (non technologie de chaîne de blocs traditionnelle)
- Testnet utilisé pour le MVP

**Backend**
- Node.js + Express.js
- Hedera SDK (@hashgraph/sdk)
- SHA-256 pour hashing des documents PDF
- QRCode generation automatique
- Sessions sécurisées pour authentification
- Déployé sur Render : https://veritrust-dozy.onrender.com

**Frontend**
- React.js 18+
- React Router pour navigation SPA
- Axios pour communication API
- qrcode.react pour génération QR Codes
- Design responsive (mobile-first)
- Déployé sur Render : https://veritrust-1.onrender.com

**Sécurité**
- Soulbound Tokens (NFTs non-transférables)
- Hash SHA-256 pour intégrité des PDF
- Authentification par session
- Validation côté serveur et client

---

## Structure du Projet

```
VeriTrust/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── diplomaController.js    # Logique création/vérification
│   │   │   └── authController.js        # Authentification université
│   │   ├── routes/
│   │   │   ├── diplomaRoutes.js
│   │   │   └── authRoutes.js
│   │   ├── services/
│   │   │   └── hederaService.js         # Interaction Hedera Hashgraph
│   │   └── index.js                     # Serveur Express
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx                 # Page d'accueil
│   │   │   ├── Login.jsx                # Connexion université
│   │   │   ├── IssueDiploma.jsx         # Création diplôme
│   │   │   ├── VerifyDiploma.jsx        # Vérification
│   │   │   └── Dashboard.jsx            # Statistiques
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## Installation Locale

### Prérequis

- Node.js >= 16.x
- npm >= 8.x
- Compte Hedera Testnet (gratuit sur portal.hedera.com)

### 1. Cloner le Repository

```bash
git clone https://github.com/Sankaraabdoul/VeriTrust.git
cd veritrust
```

### 2. Configuration Backend

```bash
cd backend
npm install
```

Créez un fichier `.env` à la racine du dossier `backend` :

```env
# Hedera Testnet Credentials
HEDERA_ACCOUNT_ID=0.0.XXXXXXX
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420XXXXXXXX
HEDERA_NETWORK=testnet

# Server Config
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=https://veritrust-1.onrender.com
```

### 3. Configuration Frontend

```bash
cd ../frontend
npm install
```

Modifiez les URLs API dans le frontend pour pointer vers :
- Production : `https://veritrust-dozy.onrender.com`
- Local : `http://localhost:5000`

### 4. Démarrage Local

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend :**
```bash
cd frontend
npm start
```

L'application sera accessible sur **https://veritrust-1.onrender.com**

---

## Déploiement en Production sur Render

### URLs de Production

**Frontend :** https://veritrust-1.onrender.com  
**Backend API :** https://veritrust-dozy.onrender.com

### Configuration Render

**Backend**
- Type : Web Service
- Build Command : `npm install`
- Start Command : `npm start`
- Variables d'environnement :
  - `HEDERA_ACCOUNT_ID`
  - `HEDERA_PRIVATE_KEY`
  - `HEDERA_NETWORK=testnet`
  - `FRONTEND_URL=https://veritrust-1.onrender.com`

**Frontend**
- Type : Static Site
- Build Command : `npm install && npm run build`
- Publish Directory : `build`
- Variables d'environnement :
  - `REACT_APP_API_URL=https://veritrust-dozy.onrender.com`

### Note Importante sur Render Free Tier

Les services gratuits de Render se mettent en veille après 15 minutes d'inactivité. Le premier accès peut prendre 30-60 secondes pour réactiver le serveur. 

**Workaround :** Visitez d'abord l'URL du backend pour l'activer avant d'utiliser l'application.

---

## Utilisation

### Accès à l'Application en Production

1. **Activez le backend** : https://veritrust-dozy.onrender.com
   - Attendez le message de confirmation de l'API
   
2. **Accédez à l'application** : https://veritrust-1.onrender.com

### Pour les Universités

1. **Connexion** : Accédez à `/login`
   - Comptes de test disponibles :
     - Email : `admin@univ-ouaga.bf` | Password : `ouaga2025`
     - Email : `admin@ucad.sn` | Password : `ucad2025`
     - Email : `admin@ufhb.ci` | Password : `ufhb2025`

2. **Créer un Diplôme** :
   - Uploadez le PDF du diplôme original
   - Remplissez les informations de l'étudiant
   - Remplissez les informations du diplôme
   - Cliquez "Créer le Diplôme"
   - Un SBT est créé sur Hedera en ~3 secondes
   - QR Code généré automatiquement

3. **Dashboard** :
   - Consultez les statistiques globales
   - Recherchez des diplômes par nom ou numéro
   - Visualisez les dernières créations
   - Exportez les données

### Pour les Employeurs et le Public

1. **Vérification par QR Code** (Recommandé) :
   - Scannez le QR Code avec votre smartphone
   - Fonctionne avec n'importe quelle application de scan (caméra iOS/Android)
   - Résultat instantané : Authentique ou Frauduleux
   - Accès aux détails complets du diplôme

2. **Vérification Manuelle** :
   - Accédez à `/verify`
   - Entrez le numéro de série du diplôme
   - Consultez le résultat

3. **Consultation sur Hedera** :
   - Cliquez sur les liens Hedera Explorer
   - Consultez la transaction directement sur le registre distribué
   - Transparence et traçabilité totales

---

## Fonctionnalités MVP

### Actuellement Implémenté

| Fonctionnalité               | Description                                | Statut |
|----------------              |-------------                               |--------|
| Authentification Université  | Login sécurisé pour universités autorisées | Fait   |
| Émission de Diplômes         | Upload PDF + création SBT sur Hedera       | Fait   |
| Hash SHA-256                 | Empreinte cryptographique du PDF           | Fait   |
| QR Code Generation           | Code scannable pour vérification           | Fait   |
| Vérification Mobile          | Scan QR Code depuis smartphone             | Fait   |
| Vérification Hedera          | Authentification sur le registre distribué | Fait   |
| Détection de Fraude          | Alerte automatique si diplôme invalide     | Fait   |
| Dashboard Statistiques       | Vue d'ensemble des diplômes émis           | Fait   |
| Design Responsive            | Compatible mobile et desktop               | Fait   |
| Déploiement Production       | Application accessible en ligne            | Fait   |

---

## Roadmap - Fonctionnalités Futures

### Phase 2 - Court Terme (1-3 mois)

**Export PDF du Certificat**
- Génération de certificat PDF téléchargeable
- Design professionnel avec QR Code intégré
- Logo de l'université et signatures numériques

**Scanner QR Code Intégré**
- Scanner directement depuis l'application web
- Utilisation de la caméra du smartphone
- Vérification automatique après scan

**Révocation de Diplômes**
- Possibilité d'annuler un diplôme frauduleux
- Marquage "RÉVOQUÉ" sur le registre
- Historique des révocations

**Notifications Email**
- Email automatique à l'étudiant lors de la création
- Notification aux employeurs lors de vérifications
- Alertes pour les universités

### Phase 3 - Moyen Terme (3-6 mois)

**Base de Données Persistante**
- Migration vers MongoDB
- Stockage sécurisé des données
- Backup automatique

**API Publique**
- Endpoints pour intégration par employeurs
- Documentation complète
- Rate limiting et authentification API

**Multi-langues**
- Interface en Français, Anglais, Arabe
- Adaptation aux différents marchés africains

**Analytics Avancés**
- Graphiques détaillés
- Rapports exportables
- Prédictions et tendances

### Phase 4 - Long Terme (6-12 mois)

**Intégration CAMES**

Le CAMES (Conseil Africain et Malgache pour l'Enseignement Supérieur) est l'organisme de référence qui accrédite les universités et harmonise les systèmes éducatifs en Afrique francophone. Il regroupe 17 pays membres : Bénin, Burkina Faso, Burundi, Cameroun, Centrafrique, Congo, Côte d'Ivoire, Gabon, Guinée, Madagascar, Mali, Niger, Rwanda, Sénégal, Tchad, Togo et RD Congo.

**Fonctionnalités CAMES Prévues :**

1. **Vérification d'Accréditation**
   - Base de données des 1200+ universités accréditées CAMES
   - Vérification automatique lors de l'inscription d'une université
   - Validation du numéro d'accréditation CAMES
   - Mise à jour trimestrielle depuis les sources officielles

2. **Badge de Certification CAMES**
   - Badge "Reconnu CAMES" sur chaque diplôme vérifié
   - Indication de validité dans les 17 pays membres
   - Affichage du numéro d'accréditation de l'université

3. **Reconnaissance Inter-Pays**
   - Diplômes automatiquement reconnus dans toute la zone CAMES
   - Facilitation de la mobilité étudiante
   - Équivalences automatiques entre pays membres

4. **Dashboard CAMES Dédié**
   - Statistiques par pays CAMES
   - Nombre de diplômes émis par région
   - Rapports de conformité pour les autorités
   - Taux de reconnaissance inter-pays

5. **Partenariat Officiel**
   - Signature d'un protocole d'accord avec le CAMES
   - Intégration aux systèmes d'information officiels
   - Co-branding sur les diplômes numériques
   - API temps réel avec les bases de données CAMES

**Impact Attendu de l'Intégration CAMES :**

- **Légitimité Institutionnelle** : Seules les universités accréditées peuvent émettre
- **Confiance Renforcée** : Double garantie (Hedera + CAMES)
- **Mobilité Facilitée** : Reconnaissance automatique dans 17 pays
- **Lutte Anti-Fraude** : Élimination des établissements non accrédités

**Application Mobile Native**
- Apps iOS et Android
- Notifications push
- Scan QR Code optimisé

**Consortium Universitaire**
- Extension à d'autres universités africaines
- Partenariat avec ministères de l'éducation
- Standardisation régionale

---

## Sécurité et Intégrité

### Soulbound Tokens (SBT)

Les diplômes sont émis sous forme de SBT (NFTs non-transférables) sur Hedera :
- **Non transférable** : Impossible de vendre ou transférer le diplôme
- **Propriété permanente** : L'étudiant conserve son diplôme à vie
- **Immuable** : Impossible de modifier les données après création
- **On-chain sur Hedera** : Toutes les informations stockées sur le registre distribué

### Vérification d'Intégrité PDF

Chaque PDF est hashé en SHA-256 avant stockage :
```
Hash PDF Original : a3f5e8d9c2b1...
Hash PDF Vérifié  : a3f5e8d9c2b1...
Correspondance → Diplôme Authentique
```

Si le PDF est modifié, le hash change, rendant la fraude détectable instantanément.

### Architecture Sécurisée

- **Backend** : Validation stricte des données entrantes
- **Frontend** : Authentification par session avec timeout
- **Hedera** : Finalité absolue, pas de double-dépense possible
- **HTTPS** : Communication chiffrée en production

---

## API Endpoints

Base URL : `https://veritrust-dozy.onrender.com`

### Authentification

**Login Université**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@universite.bf",
  "password": "password123"
}

Response 200:
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "sessionId": "1730000000000",
    "university": {
      "id": 1,
      "name": "Université de Ouagadougou",
      "email": "admin@univ-ouaga.bf",
      "country": "Burkina Faso",
      "city": "Ouagadougou"
    }
  }
}
```

**Vérification de Session**
```http
POST /api/auth/verify
Content-Type: application/json

{
  "sessionId": "1730000000000"
}
```

**Déconnexion**
```http
POST /api/auth/logout
Content-Type: application/json

{
  "sessionId": "1730000000000"
}
```

### Gestion des Diplômes

**Créer un Diplôme**
```http
POST /api/diplomas/issue
Content-Type: application/json

{
  "student": {
    "fullName": "Jean Kouassi",
    "email": "jean@example.com",
    "nationalId": "BF12345678"
  },
  "diploma": {
    "type": "Licence",
    "field": "Informatique",
    "specialization": "Intelligence Artificielle",
    "mention": "Bien",
    "dateObtained": "2024-07-15"
  },
  "university": {
    "name": "Université de Ouagadougou",
    "country": "Burkina Faso",
    "city": "Ouagadougou"
  },
  "pdfHash": "a3f5e8d9c2b1...",
  "pdfData": "base64encodedPDF...",
  "pdfFileName": "diplome.pdf"
}

Response 201:
{
  "success": true,
  "message": "Diplôme créé avec succès",
  "data": {
    "serialNumber": 4,
    "transactionId": "0.0.123456@1234567890.123456789",
    "explorerUrl": "https://hashscan.io/testnet/token/...",
    "qrCode": "data:image/png;base64...",
    "student": {...},
    "diploma": {...},
    "university": {...}
  }
}
```

**Vérifier un Diplôme**
```http
GET /api/diplomas/verify/:serialNumber

Response 200 (Authentique):
{
  "valid": true,
  "diploma": {
    "serialNumber": 4,
    "student": {
      "fullName": "Jean Kouassi",
      "email": "jean@example.com"
    },
    "diploma": {
      "type": "Licence",
      "field": "Informatique",
      "mention": "Bien"
    },
    "university": {
      "name": "Université de Ouagadougou",
      "country": "Burkina Faso"
    },
    "pdfHash": "a3f5e8d9c2b1...",
    "issuedAt": "2024-10-31T10:30:00Z"
  },
  "hedera": {
    "owner": "0.0.123456",
    "explorerUrl": "https://hashscan.io/testnet/token/...",
    "tokenUrl": "https://hashscan.io/testnet/token/..."
  }
}

Response 404 (Frauduleux):
{
  "valid": false,
  "message": "Diplôme non trouvé sur Hedera Hashgraph"
}
```

**Liste des Diplômes**
```http
GET /api/diplomas

Response 200:
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

---

## Modèle Économique

### Tarification B2B (Business-to-Business)

VeriTrust s'adresse aux universités, pas aux étudiants individuels.

| Plan         | Prix               | Description                   | Support           |
|------        |------              |-------------                  |---------          |
| Starter      | 500€/an            | Jusqu'à 100 diplômes/an       | Email             |
| Professional | 2000€/an           | Diplômes illimités            | Email + Téléphone |
| Enterprise   | Sur devis          | White-label + API dédiée + SLA | Dédié 24/7 |

### Revenus Additionnels

- **Frais Hedera** : Répercussion des frais de transaction (~0.0006€/diplôme)
- **Intégration système** : Service d'intégration avec systèmes existants (3000-10000€)
- **Formation** : Formation des administrateurs universitaires (500€/session)
- **API commerciale** : Pour employeurs souhaitant automatiser les vérifications (200€/mois)

### Projections Financières (Afrique de l'Ouest)

**Année 1**
- 20 universités × 500€ = 10 000€
- Services d'intégration : 5 000€
- **Total : 15 000€**

**Année 2**
- 100 universités × 1000€ = 100 000€
- Services additionnels : 20 000€
- **Total : 120 000€**

**Année 3**
- 500 universités × 1500€ = 750 000€
- Services et API : 100 000€
- **Total : 850 000€**

---

## Impact Social et ODD

### Objectifs de Développement Durable

**ODD 4 - Éducation de qualité**
- Valorisation des vrais diplômes
- Renforcement de la confiance dans le système éducatif
- Réduction de la fraude académique

**ODD 8 - Travail décent et croissance économique**
- Employeurs recrutent les bons profils
- Réduction des coûts de vérification
- Productivité accrue

**ODD 9 - Industrie, innovation et infrastructure**
- Modernisation du système éducatif africain
- Adoption de technologies de pointe
- Leadership technologique africain

**ODD 16 - Paix, justice et institutions efficaces**
- Lutte contre la corruption académique
- Transparence institutionnelle
- Traçabilité complète

### Indicateurs d'Impact (Objectifs MVP)

| Métrique                    | Année 1 | Année 3 |
|----------                   |---------|---------|
| Universités partenaires     | 20      | 500     |
| Diplômes certifiés          | 5 000   | 250 000 |
| Fraudes détectées           | 500     | 25 000  |
| Employeurs utilisateurs     | 100     | 5 000   |
| Pays couverts               | 5       | 20      |
| Temps moyen de vérification | < 3 sec | < 2 sec |

---

## Marché Cible

### Géographie

**Phase 1 - MVP** (Actuellement)
- Afrique de l'Ouest francophone
- Pays pilotes : Burkina Faso, Sénégal, Côte d'Ivoire

**Phase 2** (6 mois)
- Extension à tous les pays CAMES (17 pays)
- Mali, Bénin, Togo, Niger, etc.

**Phase 3** (12 mois)
- Afrique de l'Est anglophone
- Kenya, Tanzanie, Ouganda, Rwanda

**Phase 4** (18 mois)
- Afrique du Nord
- Maroc, Tunisie, Algérie, Égypte

### Clients Cibles

**Universités Publiques** (Priorité haute)
- 400+ universités publiques en Afrique de l'Ouest
- Budget institutionnel disponible
- Forte motivation anti-fraude

**Grandes Écoles Privées**
- 600+ établissements privés accrédités
- Volonté de différenciation
- Clientèle internationale

**Instituts Techniques et Professionnels**
- 200+ centres de formation professionnelle
- Besoin de reconnaissance
- Partenariats entreprises

### Taille du Marché

**Afrique de l'Ouest**
- 1200+ établissements d'enseignement supérieur
- 4 millions d'étudiants
- 800 000 diplômés par an
- Marché potentiel : 600M€/an (coûts actuels de vérification)

---

## Avantages Concurrentiels

### vs Solutions Papier Traditionnelles

| Critère                 | Papier             | VeriTrust    |
|---------                |--------            |-----------   |
| Falsifiable             | Oui                | Non (Hedera) |
| Temps de vérification   | 2-4 semaines       | < 3 secondes |
| Coût de vérification    | 50-200€            | Gratuit      |
| Disponibilité           | Bureau uniquement  | 24/7 partout |
| Mobilité internationale | Difficile          | Facile       |

### vs Autres Solutions DLT

| Critère                | Bitcoin/Ethereum                    | VeriTrust (Hedera) |
|---------               |------------------                   |--------------------|
| Vitesse                | 10-60 min                           | 3 secondes         |
| Coût                   | 2-50€                               | 0.0006€            |
| Empreinte carbone      | Élevée                              | Négative           |
| Finalité               | Probabiliste                        | Absolue            |
| Spécialisation Afrique | Non                                 | Oui (multidevise, support FR) |

### vs Solutions Centralisées

| Critère                         | Centralisé           | VeriTrust               |
|---------                        |------------          |-----------              |
| Point de défaillance            | Unique serveur       | Distribué (Hedera)      |
| Propriété diplôme               | Université           | Étudiant (SBT)          |
| Interopérabilité                | Limitée              | Totale (pays africains) |
| Pérennité                       | Dépend de l'éditeur  | Permanent (on-chain) |

---

## Technologies Utilisées

### Backend
- [Node.js](https://nodejs.org) - Runtime JavaScript serveur
- [Express.js](https://expressjs.com) - Framework web minimaliste
- [Hedera SDK](https://docs.hedera.com/hedera/sdks-and-apis) - Interaction avec Hedera Hashgraph
- [crypto](https://nodejs.org/api/crypto.html) - SHA-256 hashing natif Node.js

### Frontend
- [React](https://react.dev) - Bibliothèque UI déclarative
- [React Router](https://reactrouter.com) - Routing côté client
- [Axios](https://axios-http.com) - Client HTTP
- [qrcode.react](https://github.com/zpao/qrcode.react) - Génération QR Codes

### Hedera Hashgraph
- [Hedera Hashgraph](https://hedera.com) - DLT de niveau entreprise (non technologie de chaîne de blocs traditionnelle)
- [Hedera Token Service](https://docs.hedera.com/hedera/sdks-and-apis/sdks/token-service) - Création de tokens
- [Soulbound Tokens](https://hedera.com/blog/what-are-soulbound-tokens-sbts) - NFTs non-transférables
- [HashScan](https://hashscan.io) - Explorateur Hedera

### Infrastructure
- [Render](https://render.com) - Hébergement backend et frontend
- [Hedera Testnet](https://portal.hedera.com) - Réseau de test gratuit

---

## Tests et Qualité

### Tests Manuels Effectués

- Création de diplômes avec différents types (Licence, Master, Doctorat)
- Vérification de diplômes authentiques et frauduleux
- Scan QR Code sur iOS et Android
- Tests multi-navigateurs (Chrome, Safari, Firefox)
- Tests responsive (mobile, tablette, desktop)
- Tests de charge (10 diplômes simultanés)

### Tests Automatisés (Roadmap)

- Tests unitaires backend (Jest)
- Tests d'intégration API (Supertest)
- Tests end-to-end frontend (Cypress)
- Tests de sécurité (OWASP)

---

## Contribution

Les contributions sont les bienvenues pour améliorer VeriTrust.

### Comment Contribuer

1. Forkez le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Guidelines

- Code commenté en français
- Respect des conventions de nommage
- Tests pour les nouvelles fonctionnalités
- Documentation mise à jour

---


---

## Équipe

**Sankara Abdoul Rahim et Dahani Nelson** - Founder & Lead Developer