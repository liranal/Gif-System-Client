import React, { useState } from "react";
import { Button } from "@material-ui/core";

const SubjectForm = ({ addSubjectEvent, isSignedIn }) => {
  const [timing, settiming] = useState("");
  const [subjectName, setsubjectName] = useState("");
  const [errorNaN, seterrorNaN] = useState("");
  const [errorSubjectNameEmpty, seterrorSubjectNameEmpty] = useState("");
  const [errorTimingEmpty, seterrorTimingEmpty] = useState("");
  const addSubjectButton = () => {
    if (isNaN(timing)) {
      return seterrorNaN("error");
    }
    seterrorNaN("");
    if (!subjectName) {
      return seterrorSubjectNameEmpty("error");
    }
    seterrorSubjectNameEmpty("");
    if (!timing) {
      return seterrorTimingEmpty("error");
    }
    seterrorTimingEmpty("");
    let subjectToAdd = { subject: subjectName, timing: timing };
    settiming("");
    setsubjectName("");
    addSubjectEvent(subjectToAdd);
  };

  const renderForm = () => {
    if (!isSignedIn) {
      return null;
    } else {
      return (
        <div className="ui segment">
          <div className="ui form">
            <div className="field">
              <div className="ui header">Subject Form</div>
              <div className="two fields">
                <div className={`field ${errorSubjectNameEmpty}`}>
                  <input
                    type="text"
                    name="Subject"
                    value={subjectName}
                    placeholder="Subject"
                    onChange={(e) => {
                      setsubjectName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className={`field ${errorNaN} ${errorTimingEmpty}`}>
                  <input
                    type="text"
                    name="Timing"
                    value={timing}
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
        </div>
      );
    }
  };
  return <div>{renderForm()}</div>;
};

export default SubjectForm;
