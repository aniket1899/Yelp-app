import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_DETAILS,
  CLEAR_PROFILE,
  USER_LOADED,
  IMAGE_ERROR,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case USER_LOADED:
    case UPDATE_DETAILS:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case PROFILE_ERROR:
    case IMAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        loading: false,
      };

    default:
      return state;
  }
}
