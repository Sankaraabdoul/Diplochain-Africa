# DiploChain Africa

## Certification Académique sur Hedera Hashgraph

> Des diplômes infalsifiables pour une éducation de confiance en Afrique

---

## Problématique

La fraude aux diplômes en Afrique est un fléau majeur :
- **150 000+** faux diplômes détectés chaque année en Afrique de l'Ouest
- Coût économique : Perte de productivité, incompétence dans des postes critiques
- Processus de vérification : **2-4 semaines**, coûteux (**50-200€**), peu fiable
- **60%** des employeurs ont déjà recruté un candidat avec un faux diplôme

---

## Notre Solution

**DiploChain Africa** est une plateforme basée sur Hedera Hashgraph permettant aux universités africaines d'émettre des **diplômes numériques infalsifiables** vérifiables instantanément.

### Caractéristiques Principales

- **Sécurité Hedera Hashgraph** : Soulbound Tokens (SBT) sur Hedera
- **Vérification Instantanée** : < 3 secondes via QR Code
- **Coût Minimal** : 0.0006€ par transaction (vs 50-200€ actuellement)
- **Éco-responsable** : Hedera carbon-negative
- **Mobile-First** : Interface responsive
- **Détection de Fraude** : Automatique et infaillible

---

## Architecture Technique

### Stack Technologique

#### Hedera Hashgraph
- **Hedera Hashgraph** : DLT (Distributed Ledger Technology) de niveau entreprise
  - Transactions ultra-rapides (< 3 secondes)
  - Finalité absolue (pas de forks)
  - Coût minimal (~0.0001 HBAR/tx)
  - Algorithme de consensus Hashgraph (non blockchain)

#### Backend
- **Node.js** + Express.js
- **Hedera SDK** (@hashgraph/sdk)
- **SHA-256** pour hashing des PDF
- **QRCode** generation
- Sessions sécurisées

#### Frontend
- **React.js** 18+
- **React Router** pour navigation
- **Axios** pour API calls
- **qrcode.react** pour QR codes
- Design responsive

---

## Structure du Projet

```
DiploChain/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── diplomaController.js    # Logique création/vérification
│   │   │   └── authController.js        # Authentification université
│   │   ├── routes/
│   │   │   ├── diplomaRoutes.js
│   │   │   └── authRoutes.js
│   │   ├── services/
│   │   │   └── hederaService.js         # Interaction blockchain
│   │   └── index.js                     # Serveur Express
│   ├── .env.example
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

## Installation & Démarrage

### Prérequis

- **Node.js** >= 16.x
- **npm** >= 8.x
- Compte **Hedera Testnet** (gratuit)

### 1. Cloner le Repository

```bash
git clone https://github.com/[VOTRE-USERNAME]/diplochain-africa.git
cd diplochain-africa
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

# Frontend URL (pour CORS)
FRONTEND_URL=http://localhost:3000
```

> **Note** : Obtenez vos clés Hedera sur [portal.hedera.com](https://portal.hedera.com)

### 3. Configuration Frontend

```bash
cd ../frontend
npm install
```

### 4. Démarrage

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

L'application sera accessible sur **http://localhost:3000**

---

## Utilisation

### Pour les Universités

1. **Connexion** : Accédez à `/login`
   - Comptes de test disponibles :
     - Email : `admin@univ-ouaga.bf` | Password : `ouaga2025`
     - Email : `admin@ucad.sn` | Password : `ucad2025`
     - Email : `admin@ufhb.ci` | Password : `ufhb2025`

2. **Créer un Diplôme** :
   - Uploadez le PDF du diplôme
   - Remplissez les informations étudiant
   - Cliquez "Créer le Diplôme"
   - Un **SBT** est créé sur Hedera en ~3 secondes

3. **Dashboard** :
   - Consultez les statistiques
   - Recherchez des diplômes
   - Visualisez les dernières créations

### Pour les Employeurs

1. **Vérification Rapide** :
   - Scannez le QR Code du diplôme
   - Ou entrez le numéro de série sur `/verify`
   - Résultat instantané : **Authentique** ou **Frauduleux**

2. **Vérification Hedera** :
   - Cliquez sur les liens Hedera Explorer
   - Consultez la transaction on-chain
   - 100% transparent et traçable

---

## Fonctionnalités

### Implémentées

| Fonctionnalité | Description | Statut |
|----------------|-------------|--------|
| Authentification | Login sécurisé pour universités | Fait |
| Émission Diplômes | Upload PDF + création SBT | Fait |
| Hash SHA-256 | Empreinte cryptographique du PDF | Fait |
| QR Code | Génération automatique | Fait |
| Vérification | Authentification sur Hedera | Fait |
| Détection Fraude | Alerte automatique | Fait |
| Dashboard | Statistiques temps réel | Fait |
| Responsive | Mobile + Desktop | Fait |

### Roadmap

- [ ] Export PDF du certificat
- [ ] Scanner QR Code mobile
- [ ] Révocation de diplômes
- [ ] Notifications email
- [ ] Multi-langues (FR, EN, AR)
- [ ] Base de données MongoDB
- [ ] API publique pour employeurs

---

## Intégration CAMES

### Qu'est-ce que le CAMES ?

Le **CAMES** (Conseil Africain et Malgache pour l'Enseignement Supérieur) est l'organisme de référence qui accrédite les universités et harmonise les systèmes éducatifs en Afrique francophone. Il regroupe **17 pays membres** : Bénin, Burkina Faso, Burundi, Cameroun, Centrafrique, Congo, Côte d'Ivoire, Gabon, Guinée, Madagascar, Mali, Niger, Rwanda, Sénégal, Tchad, Togo et RD Congo.

### Pourquoi intégrer le CAMES dans DiploChain ?

L'intégration du CAMES dans notre plateforme garantit plusieurs avantages critiques :

**Légitimité institutionnelle**
- Seules les universités accréditées CAMES peuvent émettre des diplômes
- Conformité aux normes africaines d'enseignement supérieur
- Reconnaissance automatique dans 17 pays africains

**Confiance renforcée**
- Les employeurs savent que l'université est officiellement reconnue
- Les diplômes ont une valeur légale dans toute la zone CAMES
- Réduction du risque de fraude institutionnelle

**Mobilité étudiante facilitée**
- Les diplômes émis via DiploChain sont reconnus partout en Afrique francophone
- Équivalences automatiques entre pays membres
- Facilite les poursuites d'études à l'étranger

### Fonctionnalités CAMES prévues

**Vérification d'accréditation**
Avant qu'une université puisse s'inscrire sur DiploChain, le système vérifiera automatiquement si elle possède une accréditation CAMES valide. Cette vérification inclut :
- Numéro d'accréditation CAMES
- Date d'obtention de l'accréditation
- Statut actuel (actif/suspendu/révoqué)
- Programmes autorisés

**Badge de certification**
Chaque diplôme vérifié affichera un badge indiquant :
- Diplôme certifié sur Hedera Hashgraph
- Université reconnue CAMES
- Valable dans les 17 pays membres du CAMES
- Numéro d'accréditation de l'université

**Base de données CAMES**
DiploChain maintiendra une base de données à jour des universités accréditées CAMES, incluant :
- Liste complète des 1200+ établissements accrédités
- Historique des accréditations
- Programmes autorisés par université
- Mise à jour trimestrielle depuis les sources officielles CAMES

**Dashboard spécifique CAMES**
Un tableau de bord dédié permettra de visualiser :
- Nombre de diplômes émis par pays CAMES
- Universités les plus actives par région
- Statistiques de reconnaissance inter-pays
- Taux de conformité aux normes CAMES

**Rapport de conformité**
Génération automatique de rapports pour :
- Les autorités nationales d'éducation
- Le secrétariat du CAMES
- Les audits de qualité
- Les statistiques régionales

### Processus d'inscription avec CAMES

Lorsqu'une université souhaite rejoindre DiploChain :

1. **Demande d'inscription** : L'université soumet sa demande avec son numéro d'accréditation CAMES

2. **Vérification automatique** : Le système interroge la base de données CAMES pour confirmer :
   - L'existence de l'accréditation
   - La validité actuelle
   - Les programmes autorisés

3. **Validation manuelle** : L'équipe DiploChain effectue une vérification complémentaire :
   - Documents officiels d'accréditation
   - Contact avec le représentant légal
   - Vérification auprès du CAMES si nécessaire

4. **Activation du compte** : Une fois approuvée, l'université peut commencer à émettre des diplômes avec mention "Reconnu CAMES"

### Impact pour l'écosystème éducatif africain

**Pour les universités**
- Valorisation de leur accréditation CAMES
- Preuve numérique de leur légitimité
- Visibilité accrue auprès des employeurs

**Pour les étudiants**
- Diplômes reconnus dans 17 pays
- Mobilité académique facilitée
- Valeur ajoutée sur le marché du travail

**Pour les employeurs**
- Double garantie : Hedera Hashgraph + CAMES
- Confiance maximale dans l'authenticité
- Vérification simplifiée de la reconnaissance

**Pour les gouvernements**
- Lutte contre les établissements non accrédités
- Traçabilité des diplômes émis
- Statistiques fiables pour les politiques éducatives

### Conformité et gouvernance

DiploChain s'engage à :
- Respecter les directives du CAMES sur la délivrance des diplômes
- Collaborer avec le secrétariat du CAMES pour la vérification des établissements
- Fournir des rapports réguliers sur l'utilisation de la plateforme
- Participer aux initiatives de lutte contre la fraude académique en Afrique

### Développements futurs

**Partenariat officiel CAMES**
- Signature d'un protocole d'accord avec le CAMES
- Intégration aux systèmes d'information du CAMES
- Co-branding sur les diplômes numériques

**API CAMES temps réel**
- Connexion directe aux bases de données officielles
- Vérification instantanée des accréditations
- Alertes automatiques en cas de révocation

**Extension aux autres organismes**
- Association of African Universities (AAU)
- Quality Assurance Agencies des pays anglophones
- Organismes nationaux d'accréditation

---

## Sécurité

### Soulbound Tokens (SBT)

Les diplômes sont émis sous forme de **SBT** (NFTs non-transférables) :
- **Non transférable** : Impossible de vendre ou transférer
- **Propriété permanente** : L'étudiant garde son diplôme à vie
- **On-chain sur Hedera** : Toutes les données sur le registre Hedera

### Vérification d'Intégrité

Chaque PDF est hashé en **SHA-256** :
```javascript
Hash PDF Original : a3f5e8d9c2b1...
Hash PDF Vérifié  : a3f5e8d9c2b1...
Correspondance → Diplôme Authentique
```

---

## API Endpoints

### Authentification

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@universite.bf",
  "password": "password123"
}
```

### Créer un Diplôme

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
    "mention": "Bien"
  },
  "university": {
    "name": "Université de Ouagadougou",
    "country": "Burkina Faso"
  },
  "pdfHash": "a3f5e8d9...",
  "pdfData": "base64..."
}
```

### Vérifier un Diplôme

```http
GET /api/diplomas/verify/:serialNumber
```

Réponse :
```json
{
  "valid": true,
  "diploma": {
    "serialNumber": 4,
    "student": { "fullName": "Jean Kouassi" },
    "diploma": { "type": "Licence", "field": "Informatique" }
  },
  "hedera": {
    "owner": "0.0.123456",
    "explorerUrl": "https://hashscan.io/testnet/token/..."
  }
}
```

---

## Modèle Économique

### Tarification B2B

| Plan | Prix | Description |
|------|------|-------------|
| Starter | 500€/an | Jusqu'à 100 diplômes/an |
| Professional | 2000€/an | Diplômes illimités + Support |
| Enterprise | Sur devis | White-label + API dédiée |

### Projections

- **Année 1** : 20 universités × 500€ = **10 000€**
- **Année 2** : 100 universités × 1000€ = **100 000€**
- **Année 3** : 500 universités × 1500€ = **750 000€**

---

## Impact Social

### Objectifs de Développement Durable (ODD)

- **ODD 4** : Éducation de qualité
- **ODD 8** : Travail décent
- **ODD 9** : Innovation
- **ODD 16** : Paix et justice

### Métriques d'Impact

- **5 000** diplômes certifiés (Année 1)
- **500** fraudes détectées
- **100** employeurs utilisateurs
- **5** pays couverts (Burkina Faso, Sénégal, Côte d'Ivoire, Mali, Bénin)

---

## Technologies Utilisées

### Backend
- [Node.js](https://nodejs.org) - Runtime JavaScript
- [Express.js](https://expressjs.com) - Framework web
- [Hedera SDK](https://docs.hedera.com/hedera/sdks-and-apis) - Hedera Hashgraph
- [crypto](https://nodejs.org/api/crypto.html) - SHA-256 hashing

### Frontend
- [React](https://react.dev) - UI Library
- [React Router](https://reactrouter.com) - Navigation
- [Axios](https://axios-http.com) - HTTP client
- [qrcode.react](https://github.com/zpao/qrcode.react) - QR codes

### Hedera Hashgraph
- [Hedera Hashgraph](https://hedera.com) - DLT de niveau entreprise (non blockchain)
- [Soulbound Tokens](https://hedera.com/blog/what-are-soulbound-tokens-sbts) - NFTs non-transférables

---

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## License

Ce projet est sous license **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## Équipe

**Sankara Abdoul Rahim**
- Email: [sankaraabdoulrahim100@gmail.com]

---

## Remerciements

- [Hedera Hashgraph](https://hedera.com) pour la blockchain
- [React](https://react.dev) pour le framework frontend
- Communauté open-source africaine

---



**Made with love for Africa**

Luttant contre la fraude académique, un diplôme à la fois


