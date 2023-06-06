import React from 'react';
import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ tags, preview, largeImage, onClick }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem_image}
        src={preview}
        alt={tags}
        onClick={() => {
          onClick(largeImage);
        }}
      />
    </li>
  );
};

ImageGalleryItem.types = {
  largeImage: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  preview: propTypes.string.isRequired,
  onClick: propTypes.func,
};