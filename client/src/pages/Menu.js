import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../pages/Header'; // corectăm calea

function Menu() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu').then((res) => {
      setItems(res.data);
    });
  }, []);

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/api/menu/${id}`);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <Header />
      <div className="menu-container">
        <h2>Meniu Restaurant</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                border: '1px solid gray',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px',
                width: '200px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>
                <strong>{item.price} lei</strong>
              </p>
              <button onClick={() => deleteItem(item.id)}>Șterge</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;