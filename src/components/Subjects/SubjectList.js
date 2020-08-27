import React from "react";
import SubjectItem from "./SubjectItem";

const SubjectList = ({ isSignedIn, subjects, deleteSubjectEvent }) => {
  const renderSubjects = () => {
    if (!isSignedIn) {
      return null;
    }

    const deleteSubjectButton = (subjectName) => {
      deleteSubjectEvent(subjectName);
    };

    if (subjects) {
      return Object.keys(subjects).map((key, index) => {
        return (
          <SubjectItem
            subjectName={key}
            subjectTiming={subjects[key]}
            key={index}
            deleteEvent={deleteSubjectButton}
          />
        );
      });
    }
  };
  if (isSignedIn) {
    return (
      <div className="ui segment">
        <div className="ui header">Subject List</div>
        <div className="ui relaxed horizontal list">{renderSubjects()}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default SubjectList;
