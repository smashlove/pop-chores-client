import { combineReducers } from "redux";
import users from "./users";
import households from "./households";
import chores from "./chores";

export default combineReducers({
  users,
  households,
  chores
});
