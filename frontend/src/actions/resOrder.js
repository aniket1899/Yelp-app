import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ORDERS_ALL,
  GET_ORDERS_ALL_ERROR,
  UPDATE_STATUS,
  UPDATE_STATUS_ERROR,
  CANCEL_ORDER,
  CANCEL_ORDER_ERROR,
} from './types';

//  Get all the orders at that restaurant
export const getAllRestaurantOrders = () => async (dispatch) => {
  try {
    const res = await axios.get('/restaurant/order');
    dispatch({
      type: GET_ORDERS_ALL,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: GET_ORDERS_ALL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//  Update the order status
export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ status });
    const res = await axios.post(
      `/restaurant/order/status/${orderId}`,
      body,
      config,
    );

    dispatch(setAlert('Order status Updated', 'success'));

    dispatch({
      type: UPDATE_STATUS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: UPDATE_STATUS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Cancel an order
export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.post(`/restaurant/order/cancelorder/${orderId}`);

    dispatch(setAlert('Order canceled', 'success'));

    dispatch({
      type: CANCEL_ORDER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CANCEL_ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
