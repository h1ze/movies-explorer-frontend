import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ onSearch, onFilterDuration, isShortsMovies }) => {
  const { pathname } = useLocation();
  const [text, setText] = useState('');

  const inputHandler = (evt) => {
    setText(evt.target.value);
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    pathname === '/movies'
      ? localStorage.setItem('searchText', text)
      : localStorage.setItem('searchInSavedText', text);
    onSearch();
  };

  useEffect(() => {
    if (pathname === '/movies') {
      if ('searchText' in localStorage) {
        setText(localStorage.getItem('searchText'));
      }
    } else {
      if ('searchInSavedText' in localStorage) {
        setText(localStorage.getItem('searchInSavedText'));
      }
    }
  }, [pathname]);

  return (
    <section className="search-form">
      <form className="form" name="search-form">
        <div className="form__search-panel">
          <div className="form__icon"></div>
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
          <button
            className="form__button"
            type="submit"
            onClick={handleSearch}
          ></button>
          <div className="form__stroke"></div>
        </div>
        <FilterCheckbox
          onChange={onFilterDuration}
          isChecked={isShortsMovies}
        />
      </form>
      <div className="search-form__underline"></div>
    </section>
  );
};

export default SearchForm;
