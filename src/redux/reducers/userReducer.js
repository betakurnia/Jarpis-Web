import { SET_CURRENT_USER, SET_USER, SET_LOADING } from "../actions";

const initialState = {
  isAuthenticated: false,
  user: {},
  userData: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
        user: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
}
