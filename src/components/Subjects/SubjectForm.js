import React, { useState } from "react";
import { Button } from "@material-ui/core";

const SubjectForm = ({ addSubjectEvent, isSignedIn }) => {
  const [timing, settiming] = useState("");
  const [subjectName, setsubjectName] = useState("");

  const addSubjectButton = () => {
    let subjectToAdd = { subject: subjectName, timing: timing };
    addSubjectEvent(subjectToAdd);
  };

  const renderForm = () => {
    if (!isSignedIn) {
      return null;
    } else {
      return (
        <div className="ui form">
          <div className="field">
            <label>Subject</label>
            <div className="two fields">
              <div className="field">
                <input
                  type="text"
                  name="Subject"
                  placeholder="Subject"
                  onChange={(e) => {
                    setsubjectName(e.target.value);
                  }}
                ></input>
              </div>
              <div className="field">
                <input
                  type="text"
                  name="Timing"
                  placeholder="Timing"
                  onChange={(e) => {
                    settiming(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={addSubjectButton}
            >
              Add
            </Button>
          </div>
        </div>
      );
    }
  };
  return <div>{renderForm()}</div>;
};

export default SubjectForm;
