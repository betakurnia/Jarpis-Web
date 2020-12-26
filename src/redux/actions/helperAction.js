import { GET_ERRORS, SET_SUCESS } from ".";

// clear
export const clearErrorSucess = () => (dispatch) => {
  dispatch({ type: GET_ERRORS, payload: {} });
  dispatch({ type: SET_SUCESS, payload: false });
};

// clear
export const setSucess = () => (dispatch) => {
  dispatch({ type: GET_ERRORS, payload: {} });
  dispatch({ type: SET_SUCESS, payload: true });
};

// clear
export const setError = (err) => (dispatch) => {
  dispatch({ type: SET_SUCESS, payload: false });
  dispatch({ type: GET_ERRORS, payload: err.response.data });
};
