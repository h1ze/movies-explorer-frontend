import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ onSearch, onChangeFilter, isShorts }) => {
  const { pathname } = useLocation();
  const [text, setText] = useState('');
  const [isEmptyInput, setIsEmptyInput] = useState(false);

  const handleChangeInput = (evt) => {
    setText(evt.target.value);
    setIsEmptyInput(false);
    localStorage.setItem('isEmptyInput', false);
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    if (!text) {
      setIsEmptyInput(true);
      localStorage.setItem('isEmptyInput', true);
    } else {
      pathname === '/movies'
        ? localStorage.setItem('searchText', text)
        : localStorage.setItem('searchInSavedText', text);
      onSearch();
    }
  };

  useEffect(() => {
    if (pathname === '/movies') {
      if (
        'isEmptyInput' in localStorage &&
        localStorage.getItem('isEmptyInput') === 'true'
      ) {
        setIsEmptyInput(true);
      } else if ('searchText' in localStorage) {
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
            className={`form__input ${
              isEmptyInput ? 'form__input_type_error' : ''
            }`}
            type="text"
            value={text}
            name="search"
            tabIndex="1"
            placeholder={`${
              isEmptyInput ? 'Нужно ввести ключевое слово' : 'Фильм'
            }`}
            required
            onChange={handleChangeInput}
            autoComplete="off"
          />
          <button
            className="form__button"
            type="submit"
            onClick={handleSearch}
            disabled={isEmptyInput}
          ></button>
          <div className="form__stroke"></div>
        </div>
        <FilterCheckbox onChange={onChangeFilter} isChecked={isShorts} />
      </form>
      <div className="search-form__underline"></div>
    </section>
  );
};

export default SearchForm;
