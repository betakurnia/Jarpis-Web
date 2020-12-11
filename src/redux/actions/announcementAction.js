import axios from "axios";
import { GET_ERRORS } from ".";
import proxy from "../../utils/proxy";

// create announcement
export const addAnnouncement = (announcementData) => (dispatch) => {
  axios
    .post(`${proxy}/api/announcement/create`, announcementData)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// update announcement
export const updateAnnouncement = (id, announcementData) => (dispatch) => {
  console.log(id);
  axios
    .post(`${proxy}/api/announcement/update/${id}`, announcementData)
    .then((res) => {
      console.log(res.data);
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
      console.log(res.data);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
