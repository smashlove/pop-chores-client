import { LOGIN_USER, LOGOUT_USER } from "./types";
import { onLogin } from "../api/index";

export function loginUser(user_params, history) {
  return function(dispatch) {
    onLogin(user_params).then(data => {
      if (data.error) {
      } else {
        localStorage.setItem("token", data["token"]);
        dispatch({ type: LOGIN_USER, payload: data });
        history.push("/");
      }
    });
  };
}

export function logoutUser(user_params, history) {
  return function(dispatch) {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT_USER });
    history.push("/login");
  };
}
