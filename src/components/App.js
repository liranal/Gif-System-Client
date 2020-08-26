import React, { useEffect, useState } from "react";
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
} from "../actions";
import { SIGN_IN, SIGN_OUT, CLEAR_SUBJECTS } from "../actions/types";

const App = () => {
  const [gifs, setGifs] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const subjects = useSelector((state) => state.subjects);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();

  const onLogInEvent = (userName) => {
    dispatch({ type: SIGN_IN, payload: userName });
  };

  const onLogOutEvent = () => {
    dispatch({ type: SIGN_OUT });
    dispatch({ type: CLEAR_SUBJECTS });
  };

  const addSubjectEvent = (subjectToAdd) => {
    if (!subjects[subjectToAdd.subject]) {
      dispatch(createSubject(subjectToAdd));
    } else {
      dispatch(editSubject(subjectToAdd));
    }
  };

  const deleteSubjectEvent = (subjectName) => {
    setGifs(gifs.filter((subject) => subject.subject !== subjectName));
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
        setGifs((gifs) => [...gifs, data]);
      });

      socket.on("CONNECTION_SUCCESS", (data) => {
        data = JSON.parse(data);
        if (data.historyData) setGifs((gifs) => [...gifs, ...data.historyData]);
      });

      socket.on("disconnect", () => {
        socket.close();
      });
    }
    return () => {
      socket.disconnect();
      setGifs([]);
    };
  }, [userId, dispatch]);

  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <div>
        <div>
          <LoginForm
            isSignedIn={isSignedIn}
            onLogOutEvent={onLogOutEvent}
            onLoginEvent={onLogInEvent}
          />
        </div>
        <div>
          <SubjectForm
            isSignedIn={isSignedIn}
            addSubjectEvent={addSubjectEvent}
          />
        </div>
        <div>
          <SubjectList
            subjects={subjects}
            isSignedIn={isSignedIn}
            deleteSubjectEvent={deleteSubjectEvent}
          />
        </div>

        <GifList gifs={gifs} isSignedIn={isSignedIn} />
      </div>
    </div>
  );
};

export default App;
