import React from 'react';
import './Form.scss';

function Form({ city, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="city">
        What city are you visiting?
      </label>
      <input
        type="text"
        id="city"
        value={city}
        onChange={event => onChange(event.target.value)}
      />
      <input type="submit" value="Submit"/>
    </form>
  );
}

export default Form;
