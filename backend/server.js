const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const crypto = require('crypto') 
const app = express()
const expressPort = 3001

const JWT_SECRET = 'HuHUjgzua7OoqQi2M0TQbkTTu67hatmfPccqWDkgXRmfRcl2l40azSzWhIwFt3eU' 

app.use(cors())
app.use(express.json())

const dataBase = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'sneakers_db'
})

dataBase.connect((err) => {
    if (err) {
        console.log("Erreur de connexion:", err)
        return
    }
    console.log("Connexion à la base de données réussie")
})



app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Veuillez fournir un email et un mot de passe' });
    }

    const sql = "SELECT * FROM formulaire WHERE email = ? AND password = ?";
    dataBase.query(sql, [email, password], (err, results) => {
        if (err) {
            console.log("Erreur SQL :", err);
            return res.status(500).json({ error: 'Erreur du serveur', details: err.message });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Identifiants invalides' });
        }

        const user = results[0];

        const uniqueToken = crypto.randomBytes(32).toString('hex');

        const jwtToken = jwt.sign(
            { 
                id: user.id, 
                email: user.email,
                uniqueToken: uniqueToken 
            }, 
            JWT_SECRET, 
            { 
                expiresIn: '1h' 
            }
        );

        const updateTokenSql = "UPDATE formulaire SET token = ? WHERE id = ?";
        dataBase.query(updateTokenSql, [uniqueToken, user.id], (updateErr) => {
            if (updateErr) {
                console.log("Erreur lors de la mise à jour du token :", updateErr);
                return res.status(500).json({ error: 'Erreur lors de la création du token' });
            }

            return res.status(200).json({ 
                message: 'Connexion réussie', 
                user: { 
                    id: user.id, 
                    email: user.email 
                },
                token: jwtToken 
            });
        });
    });
});



app.listen(expressPort, () => {
    console.log(`Serveur lancé sur le port ${expressPort}`);
});