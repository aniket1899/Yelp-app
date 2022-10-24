import {
  GET_EVENTS,
  GET_EVENT,
  EVENT_ERROR,
  EVENT_REGISTER_SUCCESS,
  EVENT_REGISTER_ERROR,
  CLEAR_EVENT,
  REGISTERED_EVENTS,
  SUBMITTED_EVENTS,
  REGISTERED_EVENTS_ERROR,
  SUBMITTED_EVENTS_ERROR,
} from '../actions/types';

const initialState = {
  event: '',
  events: [],
  customers: [],
  submitted: [],
  registered: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false,
      };
    //   case CREATE_EVENT:
    case EVENT_REGISTER_SUCCESS:
      return {
        ...state,
        event: payload,
        loading: false,
      };

    case REGISTERED_EVENTS:
      return {
        ...state,
        registered: payload,
        loading: false,
      };

    case REGISTERED_EVENTS_ERROR:
      return {
        ...state,
        registered: [],
        loading: false,
      };

    case SUBMITTED_EVENTS:
      return {
        ...state,
        submitted: payload,
        loading: false,
      };

    case SUBMITTED_EVENTS_ERROR:
      return {
        ...state,
        submitted: [],
        loading: false,
      };

    case EVENT_ERROR:
    case EVENT_REGISTER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_EVENT:
      return {
        ...state,
        event: '',
        events: [],
        customers: [],
        registered: [],
        submitted: [],
        loading: false,
      };

    default:
      return state;
  }
}
