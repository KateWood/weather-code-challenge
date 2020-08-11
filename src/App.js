import React, { 
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';

import './App.scss';

import Form from './components/Form/Form';
import Header from './components/Header/Header';
import PackingList from './components/PackingList/PackingList';
import Recommendation from './components/Recommendation/Recommendation';
import Tile from './components/Tile/Tile';

function App() {
  const [city, setCity] = useState('');
  const [isError, setIsError] = useState('');
  const [destination, setDestination] = useState('');
  const [forecast, setForecast] = useState(null);

  // update city as it is typed
  const handleChange = newCity => {
    setIsError(false);
    setCity(newCity);
  }

  // trigger useEffect by updating search on form submit
  const handleSubmit = event => {
    event.preventDefault();
    setDestination(city);
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
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=current,minutely,hourly&appid=ef04c3abf4ce54cd1d370241f0074e94`,
            {
              method: "GET",
            }
          )
            .then(res => res.json())
            .then(response => {
              console.log(response.daily.slice(1,6));
              setForecast(response.daily.slice(1,6));
              setCity('');
            })
            .catch(error => {
              setForecast(null);
              setIsError(true);
              console.log(error);
            });
        })
        .catch(error => {
          setForecast(null);
          setIsError(true);
          console.log(error);
        });
    }
  // eslint-disable-next-line
  }, [destination]);

  return (
    <div className="app">
      <Header/>
      <Form
        city={city}
        isError={isError}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {forecast && (
        <Fragment>
          {/* title case destination */}
          <h1>Enjoy {destination.toLowerCase().split(' ').map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(' ')}!</h1>
          <div className="tile-container">
            {forecast.map(date => (
              <div className="day" key={date.dt}>
                <Tile
                  date={date.dt}
                  desc={date.weather[0].description}
                  high={date.temp.max}
                  icon={date.weather[0].icon}
                  low={date.temp.min}
                  // pop = probability of precipitation
                  pop={date.pop}
                />
                <Recommendation
                  desc={date.weather[0].description}
                  high={date.temp.max}
                  icon={date.weather[0].icon}
                  low={date.temp.min}
                />
              </div>
            ))}
          </div>
          <PackingList forecast={forecast} />
          <h1>Have a great trip!</h1>
        </Fragment>
      )}
    </div>
  );
}

export default App;
