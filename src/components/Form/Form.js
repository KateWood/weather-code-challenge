import React from 'react';
import './Form.scss';

function Form({ city, isError, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="city">
        What city are you visiting?
      </label>
      <input
        type="text"
        className={isError ? 'isError' : ''}
        placeholder={isError ? 'enter valid city name' : ''}
        id="city"
        value={isError ? '' : city}
        onChange={event => onChange(event.target.value)}
      />
      <input type="submit" value="Submit"/>
    </form>
  );
}

export default Form;
