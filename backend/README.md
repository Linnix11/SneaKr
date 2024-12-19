# Future Sneakers 👟

Une application web moderne pour suivre et créer une wishlist de sneakers avec des prix en temps réel et un design futuriste.

## 🌟 Fonctionnalités

- **Authentification sécurisée**
  - Système de connexion avec token JWT
  - Protection des routes

- **Catalogue de Sneakers**
  - Affichage des sneakers avec détails complets
  - Prix retail et prix de revente
  - Images haute qualité
  - Informations détaillées (marque, colorway, genre)

- **Filtres et Recherche**
  - Recherche par nom ou marque
  - Filtrage par marque
  - Interface intuitive

- **Wishlist Persistante**
  - Sauvegarde automatique dans le localStorage
  - Calcul du total en temps réel
  - Ajout/Suppression facile des articles
  - Persistance après actualisation de la page

## 🛠️ Technologies Utilisées

- **Frontend**
  - React.js
  - React Router DOM
  - TailwindCSS
  - LocalStorage API

- **Backend**
  - Express.js
  - MySQL
  - JWT (JSON Web Tokens)
  - API externe de sneakers

## 💎 Design

- Interface futuriste avec effets de glassmorphisme
- Animations fluides et transitions
- Design responsive
- Thème sombre moderne
- Dégradés et effets visuels dynamiques

## 🔧 Installation

1. **Cloner le repository**
```bash
git clone [url-du-repo]
```

2. **Installer les dépendances**
```bash
cd my-shop
npm install
```

3. **Configuration de la base de données**
```sql
CREATE DATABASE sneakers_db;
USE sneakers_db;

CREATE TABLE formulaire (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    token VARCHAR(255)
);
```

4. **Lancer le serveur backend**
```bash
cd backend
npm start
```

5. **Lancer l'application frontend**
```bash
npm run dev
```

## 🔍 Structure du Code

### Frontend

- `App.jsx`: Point d'entrée principal et routage
- Composants principaux:
  - `ProductCard`: Affichage des sneakers
  - `ShoppingCart`: Gestion de la wishlist
  - `Login`: Authentification
  - `SneakersList`: Liste des produits et filtres

### Backend

- `server.js`: Serveur Express et routes API
- Endpoints:
  - `/login`: Authentification utilisateur
  - `/verify-token`: Vérification du token JWT

## 🔒 Sécurité

- Tokens JWT pour l'authentification
- Protection des routes sensibles
- Gestion sécurisée des mots de passe
- Validation des données

## 📱 Responsive Design

L'application est entièrement responsive avec:
- Layout fluide
- Design mobile-first
- Adaptation automatique des grilles
- Navigation optimisée pour mobile

## 🎨 Personnalisation

Les styles peuvent être modifiés via:
- `index.css`: Animations et styles globaux
- Classes Tailwind: Styles composants
- Variables de couleur: Thème personnalisable

## 📝 TODO

- [ ] Ajout système de prix alertes
- [ ] Historique des prix
- [ ] Partage de wishlist
- [ ] Notifications de changement de prix

## 📄 Licence

MIT License - Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou soumettre une pull request.

---

Créé avec ❤️ par [Linnix]