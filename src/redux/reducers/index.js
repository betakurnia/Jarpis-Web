import { combineReducers } from "redux";
import userReducer from "./userReducer.js";
import announcementReducer from "./announcementReducer.js";
import errorReducer from "./errorReducer.js";
import sucessReducer from "./sucessReducer.js";

export default combineReducers({
  announcement: announcementReducer,
  user: userReducer,
  error: errorReducer,
  sucess: sucessReducer,
});
