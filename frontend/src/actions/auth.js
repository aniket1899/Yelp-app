import {
  USER_LOADED,
  RESTAURANT_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  CLEAR_PROFILE,
  CLEAR_EVENT,
  LOGOUT,
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

//  Load Customer
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    const decoded = jwt_decode(localStorage.token);
    localStorage.setItem('usertype', decoded.user.usertype);
  }

  try {
    const res = await axios.get('/customer/profile');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//  Load Restaurant
export const loadRestaurant = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    const decoded = jwt_decode(localStorage.token);
    localStorage.setItem('usertype', decoded.user.usertype);
  }

  try {
    const res = await axios.get('/restaurant/profile');

    dispatch({
      type: RESTAURANT_LOADED,
      payload: { data: res.data, restaurant: true },
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//  Customer Signup
export const signup = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/customer/register', body, config);

    dispatch(setAlert('Successfully registered', 'success'));

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

//  Customer Login
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/customer/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log('here', err);
    console.log(err.response.data.errors);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Restaurant Sign up
export const signupRestaurant = ({ name, email, password, location }) => async (
  dispatch,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password, location });

  try {
    const res = await axios.post('/restaurant/register', body, config);

    dispatch(setAlert('Successfully registered', 'success'));

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(loadRestaurant());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

//  Restaurant Login
export const loginRestaurant = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/restaurant/login', body, config);
    //dispatch(setAlert('Successfully registered', 'success'));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    // console.log(res.data);
    dispatch(loadRestaurant());
  } catch (err) {
    console.log(err.response.data.errors);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_EVENT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
};
