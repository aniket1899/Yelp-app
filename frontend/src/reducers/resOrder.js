import {
  GET_ORDERS_ALL,
  GET_ORDERS_ALL_ERROR,
  UPDATE_STATUS,
  UPDATE_STATUS_ERROR,
  CANCEL_ORDER,
  CANCEL_ORDER_ERROR,
} from '../actions/types';

const initialState = {
  order: '',
  allOrders: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS_ALL:
      return {
        ...state,
        allOrders: payload,
        loading: false,
      };
    case UPDATE_STATUS:
    case CANCEL_ORDER:
      return {
        ...state,
        loading: false,
      };
    case GET_ORDERS_ALL_ERROR:
    case UPDATE_STATUS_ERROR:
    case CANCEL_ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
