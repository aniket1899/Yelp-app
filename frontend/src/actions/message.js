import axios from 'axios';
import { setAlert } from './alert';
import {
  SEND_MESSAGE_ERROR,
  CONVERSATION_SUCCESS,
  CONVERSATION_ERROR,
  ALL_CONVERSATION_SUCCESS,
  ALL_CONVERSATION_ERROR,
} from './types';

export const RestaurantSendMessage = (text, customerId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ text });
    await axios.post(`/restaurant/message/${customerId}`, body, config);

    dispatch(setAlert('Message sent', 'success'));

    // history.push(`/customer/details/${customerId}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SEND_MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getConversation = (restaurantId, customerId) => async (
  dispatch,
) => {
  try {
    const res = await axios.get(
      `/restaurant/message/${customerId}/${restaurantId}`,
    );

    dispatch({
      type: CONVERSATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CONVERSATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAllConversations = () => async (dispatch) => {
  try {
    const res = await axios.get('/customer/message/all');
    dispatch({
      type: ALL_CONVERSATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: ALL_CONVERSATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCustomerConversation = (messageId) => async (dispatch) => {
  try {
    const res = await axios.get(`/customer/message/view/${messageId}`);
    dispatch({
      type: CONVERSATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CONVERSATION_SUCCESS,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const CustomerSendMessage = (text, id, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ text });
    await axios.post(`/customer/message/${id}`, body, config);

    dispatch(setAlert('Message sent', 'success'));

    // history.push(`/customer/details/${customerId}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SEND_MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
