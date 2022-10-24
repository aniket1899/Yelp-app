import { RESULTS, RESULTS_ERROR, CLEAR_RESULTS } from '../actions/types';

const initialState = {
  results: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RESULTS:
      return {
        ...state,
        results: payload,
        loading: false,
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        results: [],
        loading: false,
      };
    case RESULTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
