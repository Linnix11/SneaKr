// server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'snk',
  port: 8889  // Port MAMP par défaut
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
    return;
  }
  console.log('Connecté à MySQL');
});

// Routes d'authentification
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'Erreur lors de l\'inscription' });
      }
      res.status(201).json({ message: 'Utilisateur créé avec succès' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }
    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }
    const token = jwt.sign({ userId: user.id }, 'votre_secret_jwt', { expiresIn: '24h' });
    res.json({ token, userId: user.id });
  });
});

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requis' });

  jwt.verify(token, 'votre_secret_jwt', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    req.user = user;
    next();
  });
};

// Routes pour la collection
app.post('/api/collections', authenticateToken, (req, res) => {
  const { sneaker_id } = req.body;
  const userId = req.user.userId;
  const query = 'INSERT INTO collections (user_id, sneaker_id) VALUES (?, ?)';
  db.query(query, [userId, sneaker_id], (err, result) => {
    if (err) {
      return res.status(400).json({ error: 'Erreur lors de l\'ajout à la collection' });
    }
    res.status(201).json({ message: 'Sneaker ajoutée à la collection' });
  });
});

app.get('/api/collections', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const query = 'SELECT * FROM collections WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(400).json({ error: 'Erreur lors de la récupération de la collection' });
    }
    res.json(results);
  });
});

// Routes pour la wishlist
app.post('/api/wishlist', authenticateToken, (req, res) => {
  const { sneaker_id } = req.body;
  const userId = req.user.userId;
  const query = 'INSERT INTO wishlists (user_id, sneaker_id) VALUES (?, ?)';
  db.query(query, [userId, sneaker_id], (err, result) => {
    if (err) {
      return res.status(400).json({ error: 'Erreur lors de l\'ajout à la wishlist' });
    }
    res.status(201).json({ message: 'Sneaker ajoutée à la wishlist' });
  });
});

app.get('/api/wishlist', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const query = 'SELECT * FROM wishlists WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(400).json({ error: 'Erreur lors de la récupération de la wishlist' });
    }
    res.json(results);
  });
});

// Route pour partager la wishlist
app.post('/api/share-wishlist', authenticateToken, (req, res) => {
  const { email } = req.body;
  const userId = req.user.userId;
  // Ici, vous pouvez implémenter l'envoi d'email avec nodemailer
  res.json({ message: 'Wishlist partagée avec succès' });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});