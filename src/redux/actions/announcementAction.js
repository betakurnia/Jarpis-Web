import axios from "axios";
import { GET_ERRORS, GET_ANNOUNCMENT } from ".";
import proxy from "../../utils/proxy";

// view announcements
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

// create announcements
export const addAnnouncement = (announcementData, history) => (dispatch) => {
  axios
    .post(`${proxy}/api/announcement/create`, announcementData)
    .then(() => {
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

// update announcements
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

// delete announcements
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
