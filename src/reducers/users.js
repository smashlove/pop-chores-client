import { GET_USER, LOGOUT_USER } from "../actions/types";

const defaultState = { loggedIn: false };

export default function users(state = defaultState, action) {
  console.log(action.payload);
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        id: action.payload.id,
        points: action.payload.points,
        username: action.payload.username,
        profile_pic: action.payload.profile_pic,
        user_household: action.payload.households,
        loggedIn: true
      };
    case LOGOUT_USER:
      return { state };
    default:
      return state;
  }
}
