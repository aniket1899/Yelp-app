import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentDashboard, getImages } from '../../actions/dashboard';
import Reviews from './Reviews';
import spinner from '../layout/Spinner';
import { BACKEND_URL } from '../../utils/constants';
import '../css/dashboard.css';

const Dashboard = ({
  getCurrentDashboard,
  getImages,
  dashboard: { profile, images, loading },
}) => {
  useEffect(() => {
    getCurrentDashboard();
  }, []);

  useEffect(() => {
    if (profile) {
      getImages(profile._id);
    }
  }, [profile]);

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

  let imgSrc;
  if (profile) {
    imgSrc = `${BACKEND_URL}/restaurant/images/restaurant/${profile.image}`;
  }

  return loading && profile === null ? (
    spinner
  ) : (
    <Fragment>
      <div className='top-images my-1'>{displayImages()}</div>
      <div className='container-dash'>
        <div className='left-dash'>
          {/* <h3>{profile.restaurant_name}</h3> */}
          <img src={imgSrc} alt='Profile_pic' />
          <h3 className='title-dash'>{profile.name}</h3>
          <h3 className='sub-heading'>Contact information</h3>
          <h4 className='title-dash'>
            <i class='far fa-envelope-open'></i> Email
          </h4>
          <p>{profile.email}</p>
          <h4 className='title-dash'>
            <i class='fas fa-phone'></i> Phone
          </h4>
          <p>{profile.phone}</p>
        </div>
        <div className='middle'>
          <div className='middle-heading'>
            <h1 className='name'>{profile.name}</h1>
            <h3>
              <i class='fas fa-map-marker-alt'></i> {profile.location}
            </h3>
            <h3>
              <i class='fas fa-clock'></i> {profile.timings}
            </h3>
          </div>
          <hr />
          <h2 className='activity'>Description</h2>
          {!profile.description ? (
            <p>Tell us about your restaurant...</p>
          ) : (
            <Fragment>
              <h3 className='description'>{profile.description}</h3>
            </Fragment>
          )}
          <hr />
          <h2 className='activity'>Popular Reviews</h2>
          {profile._id && <Reviews restaurantId={profile._id} />}
        </div>
        <div className='right-dash'>
          <h3 className='right-heading'>Updates</h3>
          <div className='update-links'>
            <Link to='/restaurant/update/basic' className='btn'>
              <i class='fas fa-address-card'></i> Update Profile
            </Link>
            <br />
            <Link to='/restaurant/add/dish' className='btn'>
              <i class='fas fa-utensils'></i> Add Dishes
            </Link>
            <h3 className='right-heading'>Full Menu</h3>
            {profile.menu ? (
              <Link
                className='btn'
                to={{
                  pathname: '/restaurant/view/menu',
                  state: { menu: profile.menu },
                }}
              >
                View Menu
              </Link>
            ) : (
              <p>Please add menu items</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentDashboard: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
  getImages: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, {
  getCurrentDashboard,
  getImages,
})(Dashboard);
