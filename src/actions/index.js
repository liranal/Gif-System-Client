import subjects from "../api/subjects";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_SUBJECT,
  FETCH_SUBJECTS,
  DELETE_SUBJECT,
  EDIT_SUBJECT,
  FETCH_GIF,
  DELETE_GIFS,
  FETCH_GIFS,
  CLEAR_GIFS,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const fetchGif = (gif) => {
  return {
    type: FETCH_GIF,
    payload: gif,
  };
};

export const deleteGifs = (subject) => {
  return {
    type: DELETE_GIFS,
    payload: subject,
  };
};

export const fetchGifs = (gifs) => {
  return {
    type: FETCH_GIFS,
    payload: gifs,
  };
};

export const clearGifs = () => {
  return {
    type: CLEAR_GIFS,
  };
};

export const createSubject = (subjectToAdd) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await subjects.post("/UsersSubjects", {
    ...subjectToAdd,
    userId: userId,
    startTime: new Date().getTime(),
  });

  dispatch({ type: CREATE_SUBJECT, payload: response.data });
  //console.log(getState());
  //dispatch({ type: CREATE_SUBJECT, payload: subject });
};

export const fetchSubjects = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await subjects.get(`/UsersSubjects/${userId}`);
  if (response.data.Code === 201) {
    dispatch({ type: FETCH_SUBJECTS, payload: response.data.UserObjects });
  }
};

export const editSubject = (subject) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await subjects.patch(
    `/UsersSubjects/${userId}/Subject/${subject.subject}`,
    {
      userId: userId,
      timing: subject.timing,
      startTime: new Date().getTime(),
    }
  );
  dispatch({ type: EDIT_SUBJECT, payload: response.data });
};

export const deleteSubject = (subjectToRemove) => async (
  dispatch,
  getState
) => {
  const { userId } = getState().auth;
  await subjects.delete(`/UsersSubjects/${userId}/Subject/${subjectToRemove}`);
  dispatch({
    type: DELETE_SUBJECT,
    payload: subjectToRemove,
  });
  dispatch(deleteGifs(subjectToRemove));
};
