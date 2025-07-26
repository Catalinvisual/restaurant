const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

router.get('/register', (req, res) => {
  res.send(`
    <form action="/auth/register" method="POST">
      <h2>Înregistrare</h2>
      <input type="email" name="email" placeholder="Email" required />
      <br/>
      <input type="password" name="password" placeholder="Parolă" required />
      <br/>
      <button type="submit">Înregistrează-te</button>
    </form>
  `);
});


// GET - formular login
router.get('/login', (req, res) => {
  res.send('🔑 Aici ar fi formularul de autentificare!');
});

// POST - înregistrare utilizator
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email și parola sunt necesare' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email.trim(), hashed]
    );

    res.status(201).json({
      message: '✅ Utilizator înregistrat cu succes',
      user: result.rows[0],
    });
  } catch (err) {
    console.error('❌ Eroare la înregistrare:', err);
    res.status(500).json({ error: 'Server error. Încearcă din nou mai târziu.' });
  }
});

// POST - autentificare utilizator
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email și parola sunt necesare' });
  }

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email.trim()]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'Utilizatorul nu există' });
    }

    const match = await bcrypt.compare(password, user.rows[0].password);

    if (!match) {
      return res.status(401).json({ error: 'Parolă incorectă' });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: '🔓 Autentificare reușită',
      token,
    });
  } catch (err) {
    console.error('❌ Eroare la login:', err);
    res.status(500).json({ error: 'Server error. Încearcă din nou mai târziu.' });
  }
});

module.exports = router;