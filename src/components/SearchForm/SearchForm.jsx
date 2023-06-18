import React, { useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  const [text, setText] = useState('');

  const inputHandler = (evt) => {
    setText(evt.target.value);
  };

  return (
    <section className="search-form">
      <form className="form" name="search-form">
        <input
          id="search-input"
          className="form__input"
          type="text"
          value={text}
          name="search"
          tabIndex="1"
          placeholder="Фильм"
          required
          onChange={inputHandler}
        />
        <span className="form__error"></span>
        <button className="form__button" type="submit"></button>
      </form>
      <span className="search-form__stroke"></span>
      <FilterCheckbox />
    </section>
  );
};

export default SearchForm;
