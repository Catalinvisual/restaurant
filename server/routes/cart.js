const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ Preluare produse din coș pentru un user
router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: 'ID utilizator invalid' });
  }

  try {
    const cart = await pool.query(`
      SELECT ci.id, ci.quantity, mi.name, mi.price 
      FROM cart_items ci 
      JOIN menu_items mi ON ci.item_id = mi.id 
      WHERE ci.user_id = $1
    `, [userId]);

    res.status(200).json(cart.rows);
  } catch (err) {
    console.error('❌ Eroare la preluarea coșului:', err);
    res.status(500).json({ error: 'Server error. Nu s-a putut încărca coșul.' });
  }
});

// 🗑️ Șterge un produs din coș
router.delete('/cart/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID produs invalid' });
  }

  try {
    const result = await pool.query('DELETE FROM cart_items WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Produsul nu a fost găsit în coș' });
    }

    res.status(200).json({ message: '✅ Produs eliminat din coș', item: result.rows[0] });
  } catch (err) {
    console.error('❌ Eroare la ștergerea produsului:', err);
    res.status(500).json({ error: 'Server error. Nu s-a putut șterge produsul.' });
  }
});

module.exports = router;