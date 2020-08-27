import {
  FETCH_GIF,
  FETCH_GIFS,
  DELETE_GIFS,
  CLEAR_GIFS,
} from "../actions/types";

const INTIAL_STATE = [];

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GIF:
      return [...state, action.payload];
    case FETCH_GIFS:
      return [...state, ...action.payload];
    case DELETE_GIFS:
      let filteredState = state.filter(
        (subject) => subject.subject !== action.payload
      );
      return filteredState;
    case CLEAR_GIFS:
      return [];
    default:
      return state;
  }
};
