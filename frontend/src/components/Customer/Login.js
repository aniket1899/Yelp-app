import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../css/form.css';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setformData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/profile' />;
  }
  return (
    <div className='columns'>
      <div className='column is-two-fifths'>
        <h2 className='form-title'>Log in to Yelp</h2>
        <small className='restaurant'>
          Restaurant Owner? <Link to='/restaurant/login'>Login here</Link>
        </small>
        <div>
          <br />
          <form className='yform' onSubmit={(e) => onSubmit(e)}>
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
            />
            <button type='submit' value='login' className='btn-auth'>
              Log In
            </button>
          </form>
        </div>
        <div>
          <small>
            New to Yelp?{' '}
            <Link to='/signup' className='signup-link'>
              Sign up
            </Link>
          </small>
        </div>
      </div>
      <img
        src='https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/507de6a720e4/assets/img/home/hero_photos/pkwm_5P7XMoIXHOzQR0Y7A.jpg'
        alt='coffee_pic'
        className='login-pics'
      />
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
