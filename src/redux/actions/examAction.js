import axios from "axios";
import { CREATE_EXAM_STUDENT, SET_SUCESS, GET_ERRORS } from ".";
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

export const createExamStudent = (exams) => (dispatch) => {
  axios
    .post(`${proxy}/api/exams/create/user`, exams)
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

// export const updateExam = (id) => (dispatch) => {
//   axios
//     .post(`${proxy}/api/exams/delete/${id}` )
//     .then(() => {
//       dispatch({ type: GET_ERRORS, payload: {} });
//       dispatch({ type: SET_SUCESS, payload: true });
//     })
//     .catch((err) => {
//       dispatch({ type: SET_SUCESS, payload: false });
//       dispatch({ type: GET_ERRORS, payload: err.response.data });
//     });
// };

export const deleteExam = (id, type) => (dispatch) => {
  axios
    .post(`${proxy}/api/exams/delete/${id}/${type}`)
    .then(() => {
      dispatch({ type: GET_ERRORS, payload: {} });
      dispatch({ type: SET_SUCESS, payload: true });
    })
    .catch((err) => {
      dispatch({ type: SET_SUCESS, payload: false });
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
