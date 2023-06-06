import propTypes from 'prop-types';
import css from './Button.module.css';
import React from 'react';
export const Button = ({ onClick }) => {
  return (
    <div className={css.buttonPlace}>
    <button 
    type="button" 
    className={css.Button} 
    onClick={onClick}>
      Load more
    </button>
    </div>
  );
};

Button.propTypes = {
  onClick: propTypes.func.isRequired,
};