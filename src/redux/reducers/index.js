import { combineReducers } from "redux";
import userReducer from "./userReducer.js";
import errorReducer from "./errorReducer.js";
import sucessReducer from "./sucessReducer.js";

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  sucess: sucessReducer,
});
