import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../css/form.css';
import { loginRestaurant } from '../../actions/auth';
import PropTypes from 'prop-types';

const Signup = ({ loginRestaurant, isAuthenticated }) => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    loginRestaurant(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/restaurant/profile' />;
  }

  return (
    <div className='columns'>
      <div className='column is-two-fifths'>
        <h2 className='form-title'>Log In for Yelp</h2>
        <div>
          <form className='yform' onSubmit={(e) => onSubmit(e)}>
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
            <button type='submit' value='Signup' className='btn-auth'>
              Log In
            </button>
          </form>
        </div>

        <div>
          <small>
            Already on Yelp?{' '}
            <Link to='/restaurant/signup' className='signup-link'>
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
  loginRestaurant: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginRestaurant })(Signup);
