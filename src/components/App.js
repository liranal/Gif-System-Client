import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import SubjectForm from "./Subjects/SubjectForm";
import SubjectList from "./Subjects/SubjectList";
import GifList from "../components/Gifs/GifList";
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

import {
  createSubject,
  deleteSubject,
  editSubject,
  fetchSubjects,
  fetchGif,
  fetchGifs,
  clearGifs,
  signOut,
  signIn,
} from "../actions";
//import { SIGN_IN, SIGN_OUT, CLEAR_SUBJECTS } from "../actions/types";

const App = () => {
  const gifs = useSelector((state) => state.gifs);
  const userId = useSelector((state) => state.auth.userId);
  const subjects = useSelector((state) => state.subjects);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();

  const onLogInEvent = (userName) => {
    dispatch(signIn(userName));
  };

  const onLogOutEvent = () => {
    dispatch(signOut());
  };

  const addSubjectEvent = (subjectToAdd) => {
    if (!subjects[subjectToAdd.subject]) {
      dispatch(createSubject(subjectToAdd));
    } else {
      dispatch(editSubject(subjectToAdd));
    }
  };

  const deleteSubjectEvent = (subjectName) => {
    dispatch(deleteSubject(subjectName));
  };

  useEffect(() => {
    /* Local Server */
    //const socket = socketIOClient("127.0.0.1:8321");

    /* Cloud Server */
    const socket = socketIOClient("https://gif-system-server.herokuapp.com/");
    if (userId) {
      socket.emit("NEW_CLIENT", { userId: userId });
      dispatch(fetchSubjects());

      socket.on("NEW_GIF", (data) => {
        data = JSON.parse(data);
        dispatch(fetchGif(data));
      });

      socket.on("CONNECTION_SUCCESS", (data) => {
        data = JSON.parse(data);
        if (data.historyData) dispatch(fetchGifs(data.historyData));
      });

      socket.on("disconnect", () => {
        socket.close();
      });
    }
    return () => {
      socket.disconnect();
      dispatch(clearGifs());
    };
  }, [userId, dispatch]);

  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <div>
        <div className="ui header">
          <div className="ui segment">
            <LoginForm
              isSignedIn={isSignedIn}
              onLogOutEvent={onLogOutEvent}
              onLoginEvent={onLogInEvent}
            />
          </div>
          <SubjectForm
            isSignedIn={isSignedIn}
            addSubjectEvent={addSubjectEvent}
          />
        </div>
        <SubjectList
          subjects={subjects}
          isSignedIn={isSignedIn}
          deleteSubjectEvent={deleteSubjectEvent}
        />
      </div>
      <div>
        <GifList gifs={gifs} isSignedIn={isSignedIn} />
      </div>
    </div>
  );
};

export default App;
