import React, { useState } from 'react';
import axios from '../api/axios'; // 👈 Import corect din instanța configurată
import Header from '../pages/Header';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/auth/register', { email, password }); // 👈 Endpoint relativ
      alert('Cont creat cu succes!');
    } catch (err) {
      alert('Eroare: ' + err.message);
    }
  };

  return (
    <>
      <Header />
      <div>
        <h2>Înregistrare</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Parola" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
      </div>
    </>
  );
}

export default Register;