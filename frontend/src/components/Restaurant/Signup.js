import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../css/form.css';
import { signupRestaurant } from '../../actions/auth';
import PropTypes from 'prop-types';

const Signup = ({ signupRestaurant, isAuthenticated }) => {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
  });

  const { name, email, password, location } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signupRestaurant({ name, email, password, location });
  };

  if (isAuthenticated) {
    return <Redirect to='/restaurant/profile' />;
  }

  return (
    <div className='columns'>
      <div className='column is-two-fifths'>
        <h2 className='form-title'>Sign Up for Yelp</h2>
        <div>
          <form className='yform' onSubmit={(e) => onSubmit(e)}>
            <label className='placeholder-sub'>Name</label>
            <input
              className='my-text'
              id='name'
              name='name'
              placeholder='Name'
              type='text'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <label className='placeholder-sub'>Email</label>
            <input
              className='my-text'
              id='email'
              name='email'
              placeholder='Email'
              type='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <label className='placeholder-sub'>Password</label>
            <input
              className='my-text'
              id='password'
              name='password'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => onChange(e)}
              required
              minLength='4'
            />
            <br />
            <label className='placeholder-sub'>Location</label>
            <input
              className='my-text'
              id='location'
              name='location'
              placeholder='Location'
              type='text'
              value={location}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <p className='legal-copy'>
              You also understand that Yelp may send marketing emails about
              Yelp’s products, services, and local events. You can unsubscribe
              at any time.
            </p>
            <button type='submit' value='Signup' className='btn-auth'>
              Sign Up
            </button>
          </form>
        </div>

        <div>
          <small>
            Already on Yelp?{' '}
            <Link to='/restaurant/login' className='signup-link'>
              Log in
            </Link>
          </small>
        </div>
      </div>
      <img
        src='https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/3780032cdbe6/assets/img/home/hero_photos/TaW5o-S7q8-QYkLTWtRYFw.jpg'
        alt='dessert-cream'
        className='login-pics'
      />
    </div>
  );
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signupRestaurant })(Signup);
