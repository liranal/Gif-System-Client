import {
  CREATE_SUBJECT,
  FETCH_SUBJECTS,
  DELETE_SUBJECT,
  EDIT_SUBJECT,
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
      console.log("TEMP: ");
      console.log(temp);
      return { ...state, ...temp };
    //return { ...temp };
    //return { ...state, [action.payload.subject]: action.payload.timing };
    case CREATE_SUBJECT:
      return { ...state, [action.payload.subject]: action.payload.timing };
    case EDIT_SUBJECT:
      return { ...state, [action.payload.subject]: action.payload.timing };
    case DELETE_SUBJECT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
