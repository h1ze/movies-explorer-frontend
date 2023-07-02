import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ onChange, isChecked }) => {
  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        name="checkbox"
        onChange={onChange}
        checked={isChecked}
      />
      <span className="filter-checkbox__tumbler"></span>
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;
