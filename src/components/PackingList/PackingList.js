import React from 'react';
import './PackingList.scss';

// images
import mittens from './mittens.png';
import rainboots from './rainboots.png';
import shorts from './shorts.png';
import snowboots from './snowboots.png';
import sunglasses from './sunglasses.png';
import sweater from './sweater.png';
import tShirt from './tShirt.png';
import umbrella from './umbrella.png';

function PackingList({ forecast }) {
  let images = [];
  let items = [];
  const clothing = {
    'long sleeves and long pants': 0,
    't-shirt and shorts': 0,
    'tank top and shorts': 0,
    'warm clothing': 0,
  };

  forecast.map(date => {
    const temp = Math.round((date.temp.max + date.temp.min)/2);

    if (temp < 55){
      images.push(mittens);
      clothing['warm clothing'] += 1;
    } else if (temp < 65) {
      images.push(sweater);
      clothing['long sleeves and long pants'] += 1;
    } else if (temp < 80) {
      images.push(tShirt);
      clothing['t-shirt and shorts'] += 1;
    } else {
      images.push(shorts);
      clothing['tank top and shorts'] += 1;
    }

    switch (date.weather[0].icon) {
      case '1d':
      case '2d':
        images.push(sunglasses);
        items.push('sunglasses');
        break;
      case '9d':
      case '10d':
      case '11d':
        images.push(umbrella);
        images.push(rainboots);
        items.push('umbrella');
        items.push('rain boots');
        break;
      case '13d':
        images.push(snowboots);
        items.push('snow boots');
        break;
      default:
        return null;
    }

    // console warning - expects return
    return null;
  });

  // remove duplicates
  images = Array.from(new Set(images));
  items = Array.from(new Set(items));

  return (
    <div>
      {images.map(image => (
        <img src={image} alt={image} key={image} className="packingImages" />
      ))}
      <h4>Packing List:</h4>
      <ul>
        {Object.entries(clothing).map(([key, value]) => {
          if (value === 0) return null;
          if (value === 1) return <li key={key}>{key} for {value} day</li>;
          return <li key={key}>{key} for {value} days</li>;
        })}
        {items.map(item => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default PackingList;
