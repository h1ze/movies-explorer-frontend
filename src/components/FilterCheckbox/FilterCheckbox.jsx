import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ onClick }) => {
  // const toggleDuration = () => {
  //   onClick();
  // };
  return (
    <label className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        name="checkbox"
        onClick={onClick}
      />
      <span className="filter-checkbox__tumbler"></span>
      Короткометражки
    </label>
  );
};

export default FilterCheckbox;
