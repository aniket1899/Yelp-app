import React, { Fragment } from 'react';
import { BACKEND_URL } from '../../utils/constants';

const ImageCard = ({ images }) => {
  console.log(images);

  return (
    <Fragment>
      <img
        className='dish_img'
        src={`${BACKEND_URL}/restaurant/images/dish/${images[0]}`}
        alt='Dish_Image'
      />
    </Fragment>
  );
};

export default ImageCard;
