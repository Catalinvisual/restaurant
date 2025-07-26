const express = require('express');
const router = express.Router();
const pool = require('../db');

// 🍽️ Preluare meniul complet
router.get('/menu', async (req, res) => {
  try {
    const items = await pool.query('SELECT * FROM menu_items');
    res.status(200).json(items.rows);
  } catch (err) {
    console.error('❌ Eroare la preluarea meniului:', err);
    res.status(500).json({ error: 'Server error. Nu s-a putut încărca meniul.' });
  }
});

// 🛒 Adăugare produs în coș
router.post('/cart', async (req, res) => {
  const { user_id, item_id, quantity } = req.body;

  if (!user_id || !item_id || !quantity || isNaN(quantity)) {
    return res.status(400).json({ error: 'Date invalide pentru adăugare în coș' });
  }

  try {
    await pool.query(
      'INSERT INTO cart_items (user_id, item_id, quantity) VALUES ($1, $2, $3)',
      [user_id, item_id, quantity]
    );

    res.status(201).json({ message: '✅ Produs adăugat în coș!' });
  } catch (err) {
    console.error('❌ Eroare la adăugarea în coș:', err);
    res.status(500).json({ error: 'Server error. Nu s-a putut adăuga produsul.' });
  }
});

// 🗑️ Ștergere produs din meniu
router.delete('/menu/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID produs invalid' });
  }

  try {
    const result = await pool.query('DELETE FROM menu_items WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Produsul nu a fost găsit' });
    }

    res.status(200).json({ message: '✅ Produs șters din meniu', item: result.rows[0] });
  } catch (err) {
    console.error('❌ Eroare la ștergerea produsului:', err);
    res.status(500).json({ error: 'Server error. Nu s-a putut șterge produsul.' });
  }
});

// ➕ Adăugare produs în meniu
router.post('/menu', async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price || isNaN(price)) {
    return res.status(400).json({ error: 'Date invalide pentru meniu' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO menu_items (name, description, price) VALUES ($1, $2, $3) RETURNING *',
      [name.trim(), description.trim(), price]
    );

    res.status(201).json({
      message: '✅ Produs adăugat în meniu',
      item: result.rows[0],
    });
  } catch (err) {
    console.error('❌ Eroare la adăugarea în meniu:', err);
    res.status(500).json({ error: 'Server error. Nu s-a putut adăuga produsul.' });
  }
});

module.exports = router;