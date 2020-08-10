import React from 'react';
import './Tile.scss';

function Tile({
  date,
  desc,
  high,
  icon,
  low,
  pop,
}) {
  const src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <div className="tile">
      <h4>{new Date(date * 1000).toLocaleDateString("en-US")}</h4>
      <img src={src} alt={desc}/>
      <p>{Math.round(low)}°F - {Math.round(high)}°F</p>
      <p>{desc}</p>
      <p>{parseFloat(pop*100).toFixed(0)+"%"} chance of rain</p>
    </div>
  );
}

export default Tile;
