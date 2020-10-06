import { combineReducers } from "redux";
import auth from "./slices/auth";
import guests from "./slices/guests";
import podcasts from "./slices/podcasts";

const allReducers = combineReducers({
  auth,
  guests,
  podcasts,
});

export default allReducers;
