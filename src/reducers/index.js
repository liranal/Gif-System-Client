import { combineReducers } from "redux";
import authReducer from "./authReducer";
import subjectReducer from "./subjectReducer";
import gifReducer from "./gifReducers";
export default combineReducers({
  auth: authReducer,
  subjects: subjectReducer,
  gifs: gifReducer,
});
