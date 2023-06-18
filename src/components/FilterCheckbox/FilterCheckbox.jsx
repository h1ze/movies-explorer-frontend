import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <label className="filter-checkbox">
      <input className="filter-checkbox__input" type="checkbox" />
      <span className="filter-checkbox__tumbler"></span>
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;
