import { GET_HOUSEHOLDS } from "../actions/types";

const defaultState = {};

export default function households(state = defaultState, action) {
  switch (action.type) {
    case GET_HOUSEHOLDS:
      return {
        ...state,
        households: action.payload
      };
    default:
      return state;
  }
}
