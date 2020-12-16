import { CREATE_EXAM_STUDENT } from "../actions";

const initialState = {
  exams: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_EXAM_STUDENT:
      return {
        ...state,
        exams: action.payload,
      };
    default:
      return state;
  }
}
