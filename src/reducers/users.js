import { GET_USER, LOGOUT_USER, UPDATE_USER } from "../actions/types";

const defaultState = { loggedIn: false };

export default function users(state = defaultState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        first_name: action.payload.user.first_name,
        last_name: action.payload.user.last_name,
        id: action.payload.user.id,
        points: action.payload.user.points,
        username: action.payload.user.username,
        profile_pic: action.payload.user.profile_pic,
        user_household: action.payload.households[0],
        chores: action.payload.chores.sort(function(a, b) {
          return b.available - a.available;
        }),
        personal_chores: action.payload.chores.filter(
          chore => chore.chore_owner === action.payload.user.id
        ),
        user_chores: action.payload.user_chores.sort(function(a, b) {
          return new Date(b.completed_at) - new Date(a.completed_at);
        }),
        all_activity: action.payload.all_activity.sort(function(a, b) {
          return b.complete === true
            ? new Date(b.completed_at) - new Date(a.completed_at)
            : new Date(b.claimed_at) - new Date(a.claimed_at);
        }),
        loggedIn: true,
        status: action.payload.user.status
      };
    case UPDATE_USER:
      return {
        ...state,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        username: action.payload.username,
        profile_pic: action.payload.profile_pic,
        status: action.payload.status
      };
    case LOGOUT_USER:
      return { state };
    default:
      return state;
  }
}
