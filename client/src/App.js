import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import AddItem from './pages/AddItem';
import Cart from './pages/Cart';

function App() {
  const userId = 1; // Ex: setează un user temporar (de test)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/cart" element={<Cart userId={userId} />} />
      </Routes>
    </Router>
  );
}

export default App;
