import { CREATE_CHORE, GET_CHORES } from "../actions/types";

const defaultState = {};

export default function chores(state = defaultState, action) {
  switch (action.type) {
    case CREATE_CHORE:
      return {
        ...state,
        chores: action.payload
      };
    case GET_CHORES:
      return {
        ...state,
        household_chores: action.payload
      };
    default:
      return state;
  }
}
