import React from 'react';
import Header from './components/Header/Header';
import Tile from './components/Tile/Tile';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header/>
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
