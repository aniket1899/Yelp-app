import axios from 'axios';
import { setAlert } from './alert';
import { GET_CUSTOMER, CUSTOMER_ERROR } from './types';

// Get customer profile using ID
export const getCustomerDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/customer/profile/display/${id}`);
    dispatch({
      type: GET_CUSTOMER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
