import propTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, largeImageURL, tags, webformatURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              largeImage={largeImageURL}
              tags={tags}
              preview={webformatURL}
              onClick={onClick}
        />
        );
        })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
      tags: propTypes.string.isRequired,
      largeImageURL: propTypes.string,
    })
  ).isRequired,
  onClick: propTypes.func,
};