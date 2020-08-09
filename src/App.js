import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Tile from './components/Tile/Tile';
import './App.scss';

function App() {
  const [city, setCity] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    alert(`Traveling to ${city}`)
  }

  return (
    <div className="app">
      <Header/>
      <form onSubmit={handleSubmit}>
        <label>
          Where are you going?
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <div className="tile-container">
        <Tile />
        <Tile />
        <Tile />
        <Tile />
        <Tile />
      </div>
    </div>
  );
}

export default App;
