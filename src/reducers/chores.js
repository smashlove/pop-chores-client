import { CREATE_CHORE, GET_CHORES } from "../actions/types";

const defaultState = {};

export default function chores(state = defaultState, action) {
  switch (action.type) {
    case CREATE_CHORE:
      console.log("Create chore", action.payload);
      return {
        ...state,
        chores: action.payload
      };
    case GET_CHORES:
      console.log("get chores", action.payload);
      return {
        ...state,
        household_chores: action.payload.chores
      };
    default:
      return state;
  }
}
