import React, { useState } from 'react';
import axios from 'axios';
import Header from '../pages/Header'; // Asigură-te că Header.js există

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      alert(`Token primit: ${res.data.token}`);
    } catch (err) {
      alert('Autentificare eșuată.');
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-form">
          <h2>Autentificare</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Parolă"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Conectează-te</button>
        </div>
      </div>
    </>
  );
}

export default Login;