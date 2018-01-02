import {
  GET_USER,
  LOGOUT_USER,
  GET_HOUSEHOLDS,
  CREATE_USER,
  CREATE_CHORE,
  GET_CHORES,
  UPDATE_CHORE,
  UPDATE_USER
} from "./types";
import {
  onLogin,
  getHouseholds,
  fetchUser,
  onCreate,
  onCreateChore,
  getChores,
  onUpdateChore,
  onUpdateUser
} from "../api/index";

export function loginUser(user_params, history) {
  return function(dispatch) {
    onLogin(user_params).then(data => {
      if (data.error) {
      } else {
        localStorage.setItem("token", data["token"]);
        dispatch({ type: GET_USER, payload: data });
        history.push("/profile");
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

export function createChore(chore_params, history, user_params) {
  return function(dispatch) {
    onCreateChore(chore_params, user_params).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch({ type: CREATE_CHORE, payload: data });
        dispatch({ type: GET_USER, payload: data });
      }
    });
  };
}

export function updateChore(chore_params, user_params, type, history) {
  return function(dispatch) {
    onUpdateChore(chore_params, user_params, type).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch({ type: GET_CHORES, payload: data });
        dispatch({ type: GET_USER, payload: data });
      }
    });
  };
}

export function updateUser(user_input, user_params, type) {
  return function(dispatch) {
    onUpdateUser(user_input, user_params, type).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch({ type: GET_CHORES, payload: data });
        dispatch({ type: GET_USER, payload: data });
      }
    });
  };
}

export function fetchChores(user_params, history) {
  return function(dispatch) {
    getChores(user_params.user_household.id).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch({ type: GET_CHORES, payload: data });
        dispatch({ type: GET_USER, payload: data });
      }
    });
  };
}

export function fetchHouseholds() {
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
        }
      });
    };
  }
}
