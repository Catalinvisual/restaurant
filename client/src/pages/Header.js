// src/components/Header.js
import { Link } from 'react-router-dom';
import React from 'react';
import '../styles/Header.css'; // Asigură-te că ai un fișier CSS pentru stiluri


function Header() {
  return (
   <header className="header">
  <div className="logo">🍽️ Restaurantul Meu</div>
  <nav className="nav">
  <Link to="/">Home</Link>
  <Link to="/menu">Meniu</Link>
  <Link to="/register">Înregistrare</Link>
  <Link to="/login">Autentificare</Link>
    <Link to="/cart">Coș</Link>
    <Link to="/add-item">Adaugă Articol</Link>
</nav>

</header>

  );
}

export default Header;