import React from 'react';
import Header from '../pages/Header'; // ajustăm calea în funcție de structură


function Home() {
  return (
    <>
      <Header />
      <main className="home-content">
        <h2>Bine ai venit la Restaurantul Meu! 🍽️</h2>
        <p>Explorează meniul nostru delicios și rezervă o masă.</p>
      </main>
    </>
  );
}

export default Home;