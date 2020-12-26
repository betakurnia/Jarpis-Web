import { SET_SUCESS } from "../actions";

const initialState = false;

export default function sucessReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SUCESS:
      return action.payload;
    default:
      return state;
  }
}
