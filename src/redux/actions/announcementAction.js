import axios from "axios";
import { GET_ERRORS, SET_SUCESS, GET_ANNOUNCMENT } from ".";
import proxy from "../../utils/proxy";

export const viewAnnouncement = () => (dispatch) => {
  axios
    .get(`${proxy}/api/announcement/view`)
    .then((res) => {
      dispatch({
        type: GET_ANNOUNCMENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// create announcement
export const addAnnouncement = (announcementData, history) => (dispatch) => {
  axios
    .post(`${proxy}/api/announcement/create`, announcementData)
    .then((res) => {
      history.push("/pengumuman");
      // window.location.href = "/pengumuman";
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// update announcement
export const updateAnnouncement = (id, announcementData, history) => (
  dispatch
) => {
  axios
    .post(`${proxy}/api/announcement/update/${id}`, announcementData)
    .then((res) => {
      history.push("/pengumuman");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// delete announcement
export const deleteAnnouncement = (id) => (dispatch) => {
  axios
    .post(`${proxy}/api/announcement/delete/${id}`)
    .then((res) => {
      dispatch({
        type: GET_ANNOUNCMENT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// clear
export const clearErrorSucess = () => (dispatch) => {
  dispatch({ type: GET_ERRORS, payload: {} });
  dispatch({ type: SET_SUCESS, payload: false });
};
