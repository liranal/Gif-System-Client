import {
  CREATE_SUBJECT,
  FETCH_SUBJECTS,
  DELETE_SUBJECT,
  EDIT_SUBJECT,
  CLEAR_SUBJECTS,
} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SUBJECTS:
      const temp = action.payload.reduce(
        (obj, element) => ({
          ...obj,
          [element.subject]: element.timing,
        }),
        {}
      );
      return { ...state, ...temp };
    case CREATE_SUBJECT:
      return { ...state, [action.payload.subject]: action.payload.timing };
    case EDIT_SUBJECT:
      return { ...state, [action.payload.subject]: action.payload.timing };
    case DELETE_SUBJECT:
      return _.omit(state, action.payload);
    case CLEAR_SUBJECTS:
      return {};
    default:
      return state;
  }
};
