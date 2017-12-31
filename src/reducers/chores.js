import { CREATE_CHORE, GET_CHORES, UPDATE_CHORE } from "../actions/types";

const defaultState = {};

export default function chores(state = defaultState, action) {
  switch (action.type) {
    case CREATE_CHORE:
      return {
        ...state,
        household_chores: action.payload.chores
      };
    case UPDATE_CHORE:
      return {
        ...state,
        household_chores: action.payload.chores
      };
    case GET_CHORES:
      return {
        ...state,
        household_chores: action.payload.chores
      };
    default:
      return state;
  }
}
