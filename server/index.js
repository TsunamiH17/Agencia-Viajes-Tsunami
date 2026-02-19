import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt'; // <--- Importamos bcrypt

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agencia-viajes'
});

const saltRounds = 10; // Nivel de seguridad de la encriptación

// LOGIN CON BCRYPT
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT id, name, email, password, role FROM users WHERE email = ?';
  
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length > 0) {
      const user = results[0];
      // Comparamos la clave escrita con el hash de la BD
      const match = await bcrypt.compare(password, user.password);
      
      if (match) {
        res.json({ user: { id: user.id, name: user.name, role: user.role }, token: 'token-seguro' });
      } else {
        res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    } else {
      res.status(401).json({ error: 'Usuario no encontrado' });
    }
  });
});

// REGISTRO CON BCRYPT
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Encriptamos la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "client")';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: "Email ya registrado" });
      
      db.query('INSERT INTO wallets (user_id, balance) VALUES (?, 1000)', [result.insertId]);
      res.status(201).json({ message: "OK" });
    });
  } catch (error) {
    res.status(500).json({ error: "Error al encriptar" });
  }
});

app.listen(4000, () => console.log("✅ SERVIDOR SEGURO EN EL 4000"));