import React from 'react';
import './Recommendation.scss';

function Recommendation({
  desc,
  high,
  icon,
  low,
}) {
  let extra,
      clothing;
  const temp = Math.round((high + low)/2);

  // determine whether an extra item is needed
  switch (icon) {
    case '1d':
    case '2d':
      extra = 'sunglasses and sunscreen';
      break;
    case '9d':
    case '10d':
    case '11d':
      extra = 'an umbrella and rain boots';
      break;
    case '13d':
      extra = 'snow boots';
      break;
    default:
      extra = null;
  }

  // determine what clothes to pack based on daily temp
  if (temp < 55){
    clothing = "Pack warm clothing, because it will be cold!";
  } else if (temp < 65) {
    clothing = "It will be a little chilly, but not too cold. Pack long sleeves and long pants.";
  } else if (temp < 80) {
    clothing = "A t-shirt and shorts should be good for today.";
  } else {
    clothing = "It will be HOT! Pack a tank top and shorts.";
  }

  return (
    <p className="recommendation">
      Looks like {desc}
      {extra && (
        <span>, so bring {extra}</span>
      )}
      . {clothing}
    </p>
  );
}

export default Recommendation;
