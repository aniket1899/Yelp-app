import axios from 'axios';
import { setAlert } from './alert';
import { CUSTOMER_ORDERS, CUSTOMER_ORDERS_ERROR } from './types';

//  Get all the orders placed by current customer
export const getAllOrders = () => async (dispatch) => {
  try {
    const res = await axios.get('/customer/order/all');
    dispatch({
      type: CUSTOMER_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CUSTOMER_ORDERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
