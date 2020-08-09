import React from 'react';
import logo from './sun.png';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1>Packing Planner</h1>
    </header>
  );
}

export default Header;
