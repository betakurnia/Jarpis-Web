import axios from "axios";
// import { CREATE_EXAM_STUDENT, SET_SUCESS, GET_ERRORS } from ".";
import proxy from "../../utils/proxy";

export const createExam = (exams) => (dispatch) => {
  axios
    .post(`${proxy}/api/exams/create?types=${exams.type}`, exams)
    .then(() => {
      dispatch({ type: GET_ERRORS, payload: {} });
      dispatch({ type: SET_SUCESS, payload: true });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    })
    .catch((err) => {
      dispatch({ type: SET_SUCESS, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
