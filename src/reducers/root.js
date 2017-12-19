import { combineReducers } from "redux";
import users from "./users";
import households from "./households";

export default combineReducers({
  users,
  households
});
