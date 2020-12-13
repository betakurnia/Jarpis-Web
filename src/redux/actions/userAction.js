import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, GET_ERRORS, SET_SUCESS } from ".";
import proxy from "../../utils/proxy";

// Login - Get User Token
export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post(`${proxy}/api/users/login`, userData)
    .then((res) => {
      // Save to localStorage
      console.log(res);
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push("/dashboard");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Log user out
export const logoutUser = (history) => (dispatch) => {
  // console.log("logout");
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.href = "/";
};

// Register user
export const registerUser = (userData) => (dispatch) => {
  axios
    .post(`${proxy}/api/users/register?role=${userData.role}`, userData)
    .then(() => {
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      dispatch({
        type: SET_SUCESS,
        payload: true,
      });
      setTimeout(() => {
        window.location.href = "/admin/register";
      }, 1000);
    })
    .catch((err) => {
      dispatch({
        type: SET_SUCESS,
        payload: false,
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
