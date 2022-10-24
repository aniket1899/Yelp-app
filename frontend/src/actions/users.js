import axios from 'axios';
import { setAlert } from './alert';
import {
  ALL_CUSTOMERS,
  ALL_CUSTOMERS_ERROR,
  FOLLOW_SUCCESS,
  FOLLOW_ERROR,
} from './types';

export const getAllCustomers = () => async (dispatch) => {
  try {
    const res = await axios.get('/customer/profile/all');
    dispatch({
      type: ALL_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ALL_CUSTOMERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getSearchResutls = (data) => async (dispatch) => {
  try {
    const res = await axios.get(`/customer/users/${data}`);
    dispatch({
      type: ALL_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ALL_CUSTOMERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const followUser = (id) => async (dispatch) => {
  try {
    await axios.post(`/customer/users/${id}`);
    dispatch({
      type: FOLLOW_SUCCESS,
    });

    dispatch(setAlert('Successfully followed the user', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: FOLLOW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getFollowers = () => async (dispatch) => {
  try {
    const res = await axios.get(`/customer/users/following/all`);
    dispatch({
      type: ALL_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ALL_CUSTOMERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
