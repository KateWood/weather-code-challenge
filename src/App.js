import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import Tile from './components/Tile/Tile';
import './App.scss';

function App() {
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');

  // update city as it is typed
  const handleChange = event => {
    setCity(event.target.value);
  }

  // trigger useEffect by updating search on form submit
  const handleSubmit = event => {
    event.preventDefault();
    setSearch(city);
    console.log(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ef04c3abf4ce54cd1d370241f0074e94`);
  }

  // prevent useEffect on initial page load
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
     isInitialMount.current = false;
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ef04c3abf4ce54cd1d370241f0074e94`,
        {
          method: "GET",
        }
      )
        .then(res => res.json())
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error));
    }
  }, [search]);

  return (
    <div className="app">
      <Header/>
      <form onSubmit={handleSubmit}>
        <label>
          What city are you visiting?
          <input
            type="text"
            value={city}
            onChange={handleChange}
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
