import React, { Fragment } from 'react';
import styles from './Dashboard-forms/form.module.css';
import { BACKEND_URL } from '../../utils/constants';

const Images = ({ location }) => {
  let images = location.state.images;

  if (images.length > 5) {
    images = images.slice(0, 5);
  }

  const displayImages = () => {
    return images.map((file) => {
      return (
        <img
          className='dish-img'
          src={`${BACKEND_URL}/restaurant/images/dish/${file}`}
          alt='Dish_Image'
        />
      );
    });
  };

  return (
    <Fragment>
      <div>
        <h1 className={styles.heading}>Dish Images</h1>
        <hr />
        <p>{displayImages()}</p>
      </div>
    </Fragment>
  );
};

export default Images;
