import axios from 'axios';
import { setAlert } from './alert';
import { RESULTS, RESULTS_ERROR, CLEAR_RESULTS } from './types';

//  Get restaurants based on query
export const getQueryResults = (searchData) => async (dispatch) => {
  try {
    const res = await axios.get(`/restaurants/search/${searchData}`);

    dispatch({
      type: RESULTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RESULTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// home
export const clearResults = () => (dispatch) => {
  dispatch({
    type: CLEAR_RESULTS,
  });
};
