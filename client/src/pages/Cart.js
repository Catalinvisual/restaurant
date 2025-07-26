import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../pages/Header';

function Cart({ userId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cart/${userId}`).then(res => {
      setItems(res.data);
    });
  }, [userId]);

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/cart/${id}`);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <Header />
    <div>
      <h2>Coșul tău</h2>
      {items.length === 0 ? <p>Coșul este gol.</p> : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} x {item.quantity} - {item.price * item.quantity} lei
              <button onClick={() => deleteItem(item.id)}>Șterge</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}

export default Cart;