import { GET_ANNOUNCMENT } from "../actions";

const initialState = {
  announcement: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ANNOUNCMENT:
      return {
        ...state,
        announcement: action.payload,
      };
    default:
      return state;
  }
}
