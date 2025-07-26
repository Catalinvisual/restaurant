import React, { useState } from 'react';
import axios from 'axios';
import Header from '../pages/Header';

function AddItem() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/menu', {
        name,
        description,
        price: parseFloat(price)
      });
      alert('Produs adăugat cu succes!');
      setName('');
      setDescription('');
      setPrice('');
    } catch (err) {
      alert('Eroare la adăugare: ' + err.message);
    }
  };

  return (
    <>
      <Header />
    <div>
      <h2>Adaugă produs în meniu</h2>
      <input placeholder="Nume produs" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Descriere" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="number" placeholder="Preț" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={handleSubmit}>Adaugă</button>
    </div>
    </>
  );
}

export default AddItem;