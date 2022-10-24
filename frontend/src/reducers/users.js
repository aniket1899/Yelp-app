import { ALL_CUSTOMERS, ALL_CUSTOMERS_ERROR } from '../actions/types';

const initialState = {
  customers: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ALL_CUSTOMERS:
      return {
        ...state,
        customers: payload,
        loading: false,
      };
    //   case GET_IMAGES:
    //     return {
    //       ...state,
    //       images: payload,
    //       loading: false,
    //     };
    case ALL_CUSTOMERS_ERROR:
      //   case RES_IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
