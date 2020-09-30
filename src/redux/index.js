import { combineReducers } from "redux";
import auth from "./slices/auth";
import guests from "./slices/guests";

const allReducers = combineReducers({
  auth,
  guests,
});

export default allReducers;
