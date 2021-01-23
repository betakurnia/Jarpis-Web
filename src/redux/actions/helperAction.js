import { GET_ERRORS, SET_SUCESS } from ".";

// clear error sucess
export const clearErrorSucess = () => (dispatch) => {
  dispatch({ type: GET_ERRORS, payload: {} });
  dispatch({ type: SET_SUCESS, payload: false });
};

// set sucess
export const setSucess = () => (dispatch) => {
  dispatch({ type: GET_ERRORS, payload: {} });
  dispatch({ type: SET_SUCESS, payload: true });
};

// set error
export const setError = (err) => (dispatch) => {
  dispatch({ type: SET_SUCESS, payload: false });
  dispatch({ type: GET_ERRORS, payload: err.response.data });
};
