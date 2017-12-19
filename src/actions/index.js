import { GET_USER, LOGOUT_USER, GET_HOUSEHOLDS, CREATE_USER } from "./types";
import { onLogin, getHouseholds, fetchUser, onCreate } from "../api/index";

export function loginUser(user_params, history) {
  return function(dispatch) {
    onLogin(user_params).then(data => {
      if (data.error) {
      } else {
        localStorage.setItem("token", data["token"]);
        dispatch({ type: GET_USER, payload: data });
        history.push("/");
      }
    });
  };
}

export function createUser(user_params, history) {
  return function(dispatch) {
    onCreate(user_params).then(data => {
      if (data.error) {
      } else {
        localStorage.setItem("token", data["token"]);
        dispatch({ type: CREATE_USER, payload: data });
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

export function households(user_params, history) {
  return function(dispatch) {
    getHouseholds().then(data => {
      if (data.error) {
      } else {
        dispatch({ type: GET_HOUSEHOLDS, payload: data });
      }
    });
  };
}

export function checkUser(user_params, history) {
  let token = localStorage.token;
  if (token !== undefined) {
    return function(dispatch) {
      fetchUser(token).then(data => {
        if (data.error) {
        } else {
          dispatch({ type: GET_USER, payload: data });
          history.push("/");
        }
      });
    };
  }
}
