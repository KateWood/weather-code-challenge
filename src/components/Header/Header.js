import React from 'react';
import logo from './sun.png';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div>
        <img src={logo} className="logo" alt="logo" />
        <h1>Packing Planner</h1>
      </div>
    </header>
  );
}

export default Header;
