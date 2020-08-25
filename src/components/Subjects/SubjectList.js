import React from "react";
import SubjectItem from "./SubjectItem";

const SubjectList = ({ isSignedIn, subjects, deleteSubjectEvent }) => {
  const renderSubjects = () => {
    if (!isSignedIn) {
      return null;
    }
    console.log(subjects);
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
  return <div className="ui relaxed horizontal list">{renderSubjects()}</div>;
};

export default SubjectList;
