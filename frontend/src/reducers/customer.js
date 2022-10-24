import { GET_CUSTOMER, CUSTOMER_ERROR, CLEAR_CUSTOMER } from '../actions/types';

const initialState = {
  customer: '',
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMER:
      return {
        ...state,
        customer: payload,
        loading: false,
      };
    case CUSTOMER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_CUSTOMER:
      return {
        ...state,
        customer: '',
        loading: false,
      };
    default:
      return state;
  }
}
