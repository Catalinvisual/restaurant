require('dotenv').config(); // ✅ Prima linie!

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// 🔐 CORS configurat specific pentru frontend-ul Render
const corsOptions = {
  origin: 'https://restaurant-frontend-00rz.onrender.com',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ⚠️ Log fallback pentru PORT
if (!process.env.PORT) {
  console.warn('⚠️ PORT nedefinit în .env — se folosește fallback 5000');
}

// 🧪 Test conexiune DB
pool.query('SELECT 1', (err) => {
  if (err) {
    console.error('❌ Conexiunea la DB a eșuat:', err);
  } else {
    console.log('🟢 Conexiune la DB OK!');
  }
});

// 🔀 Rute definite
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/menu'));
app.use('/api', require('./routes/cart'));

// ✅ Ruta test simplă
app.get('/', (req, res) => {
  res.send('Serverul funcționează perfect! 🍝');
});

// 🚀 Pornire server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serverul rulează pe http://localhost:${PORT}`);
});

// 🧯 Handler erori globale
process.on('unhandledRejection', (err) => {
  console.error('🔴 Promise negestionat:', err);
});
process.on('uncaughtException', (err) => {
  console.error('🔴 Excepție negestionată:', err);
});