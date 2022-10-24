import { CUSTOMER_ORDERS, CUSTOMER_ORDERS_ERROR } from '../actions/types';

const initialState = {
  order: '',
  allorders: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CUSTOMER_ORDERS:
      return {
        ...state,
        allorders: payload,
        loading: false,
      };
    case CUSTOMER_ORDERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
