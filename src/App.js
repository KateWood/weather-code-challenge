import React, { 
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';

import './App.scss';

import Header from './components/Header/Header';
import Tile from './components/Tile/Tile';

function App() {
  const [city, setCity] = useState('');
  const [destination, setDestination] = useState('');
  const [forecast, setForecast] = useState(null);

  // update city as it is typed
  const handleChange = event => {
    setCity(event.target.value);
  }

  // trigger useEffect by updating search on form submit
  const handleSubmit = event => {
    event.preventDefault();
    setDestination(city);
    console.log(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ef04c3abf4ce54cd1d370241f0074e94`);
  }

  // prevent useEffect on initial page load
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
     isInitialMount.current = false;
    } else {
      // use the city name to get the coordinates
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ef04c3abf4ce54cd1d370241f0074e94`,
        {
          method: "GET",
        }
      )
        .then(res => res.json())
        .then(response => {
          let lat = response.city.coord.lat;
          let lon = response.city.coord.lon;
          // use the coordinates to get the daily forecast
          return fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=ef04c3abf4ce54cd1d370241f0074e94`,
            {
              method: "GET",
            }
          )
            .then(res => res.json())
            .then(response => {
              // add formatted date to each object
              let nextFiveDays = response.daily.slice(1,6).map(day=> ({ ...day, formattedDate: new Date(day.dt * 1000).toLocaleDateString("en-US") }));
              console.log(nextFiveDays);
              setForecast(nextFiveDays);
              setCity('');
            })
            .catch(err => console.log(err));
        })
        .catch(error => console.log(error));
    }
  // eslint-disable-next-line
  }, [destination]);

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
      {forecast && (
        <Fragment>
          <h1>Enjoy {destination}!</h1>
          <div className="tile-container">
            {forecast.map(date => (
              <Tile key={date.dt}>
                {date.formattedDate}
              </Tile>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default App;
