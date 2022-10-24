import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import spinner from '../layout/Spinner';
import styles from './restaurant.module.css';
import Rating from 'react-rating';
import { getRestaurant } from '../../actions/restaurants';
import { getImages } from '../../actions/dashboard';
import Date from '../../utils/Date';
import { BACKEND_URL } from '../../utils/constants';

const Restaurant = ({
  match,
  getRestaurant,
  getImages,
  restaurant: { restaurant, images, loading },
  profile: { profile },
}) => {
  const resId = match.params.res_id;

  useEffect(() => {
    getRestaurant(resId);
  }, []);

  useEffect(() => {
    if (restaurant) {
      getImages(restaurant._id);
    }
  }, [restaurant]);

  const displayImages = () => {
    if (images.length > 5) {
      images = images.slice(0, 5);
    }
    return images.map((file) => {
      return (
        <img
          className='rest-dish-imgs'
          src={`${BACKEND_URL}/restaurant/images/dish/${file}`}
          alt='Dish_Image'
        />
      );
    });
  };

  const {
    _id,
    name,
    email,
    location,
    phone,
    description,
    timings,
    deliveryMethod,
    cuisine,
    menu,
  } = restaurant;

  const displayReview = () => {
    return profile.reviews.map((review) => {
      if (review.restaurant === _id) {
        console.log('Hee');
        return (
          <Fragment>
            <div className='box has-background-warning-light'>
              <div className='rating'>
                <Rating
                  emptySymbol='far fa-star'
                  fullSymbol='fas fa-star'
                  fractions={2}
                  readonly
                  initialRating={review.rating}
                />
                {'  '}
                <small>
                  Review on <Date date={review.date.substring(0, 10)} />
                </small>
              </div>
              <p className={styles.headers}>
                <strong>{review.text}</strong>
              </p>
            </div>
          </Fragment>
        );
      }
    });
  };

  let imgSrc;
  if (restaurant) {
    imgSrc = `${BACKEND_URL}/restaurant/images/restaurant/${restaurant.image}`;
  }

  return loading || !restaurant ? (
    spinner
  ) : (
    <Fragment>
      <div className='top-images my-1'>{images && displayImages()}</div>
      <div className={styles.container1}>
        <div className='columns is-vcentered'>
          <div className='column is-12'>
            <div className='columns'>
              <div className='column is-3'>
                <img src={imgSrc} alt='Restaurant_image' />
              </div>
              <div className='column is-6'>
                <h1 className={styles.name1}>{name}</h1>
                <p className={styles.headers}>
                  <i class='fas fa-dollar-sign'></i>
                  <i class='fas fa-dollar-sign'></i> | {cuisine}
                </p>
                <p className={styles.headers}>
                  <i class='fas fa-check' style={{ color: 'green' }}></i>{' '}
                  {deliveryMethod}
                </p>
                <br />
                <p className={styles.headers}>
                  <i className='far fa-envelope-open'></i> {email}
                </p>
                <p className={styles.headers}>
                  <i className='fas fa-phone'></i> {phone}
                </p>
                <p className={styles.headers}>
                  <i className='fas fa-map-marker-alt'></i> {location}
                </p>
                <p className={styles.headers}>
                  <i className='fas fa-clock'></i> {timings}
                </p>
                <br />
                {localStorage.usertype === 'customer' ? (
                  <Fragment>
                    {' '}
                    <Link
                      to={`/customer/restaurant/review/${_id}`}
                      className={styles.top_btn}
                    >
                      🌟 Write a Review
                    </Link>
                    <Link
                      to={`/customer/placeorder/${_id}`}
                      className={styles.top_btn}
                    >
                      Order Now
                    </Link>
                  </Fragment>
                ) : (
                  ''
                )}
              </div>
            </div>
            <h1 className={styles.form_title}>Description</h1>
            <hr />
            <p className={styles.headers}>{description}</p>
            <br />
            {menu && (
              <Link
                className={styles.top_btn}
                to={{
                  pathname: '/restaurant/view/menu',
                  state: { menu: menu },
                }}
              >
                View Full Menu
              </Link>
            )}
            {localStorage.usertype === 'customer' ? (
              <Fragment>
                {profile && profile.reviews && (
                  <Fragment>
                    <h1 className={styles.form_title}>Your Review</h1>
                    <hr />
                    {displayReview()}
                  </Fragment>
                )}
              </Fragment>
            ) : (
              ''
            )}
            <br />
            <Link to='/customer/restaurants' className={styles.top_btn}>
              Back to Restaurants
            </Link>
            <br /> <br />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Restaurant.propTypes = {
  getRestaurant: PropTypes.func.isRequired,
  getImages: PropTypes.func.isRequired,
  restaurant: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurant: state.restaurant,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getRestaurant,
  getImages,
})(Restaurant);
