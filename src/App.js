import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Admin from './components/Admin';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Services from './components/Services';
import Login from './components/Login';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const login = (password) => {
    if (password === '123') {  // Здесь задается проверка пароля
      setAuthenticated(true);
    } else {
      alert('Неверный пароль');
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Наращивание ресниц от мастера Марии</h1>
          <Navigation authenticated={authenticated} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/services" element={<Services />} />
            <Route path="/admin" element={authenticated ? <Admin /> : <Login onLogin={login} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 Мария - мастер по наращиванию ресниц</p>
        </footer>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <section className="about">
      <h2>О мастере</h2>
      <p>Привет! Меня зовут Мария, и я профессиональный мастер по наращиванию ресниц с опытом более 5 лет.</p>
    </section>
  </div>
);

export default App;
