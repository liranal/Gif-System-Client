import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
const SubjectItem = ({ subjectName, subjectTiming, deleteEvent }) => {
  const deleteSubjectEvent = () => {
    deleteEvent(subjectName);
  };
  return (
    <div className="item">
      <Button
        variant="contained"
        color="secondary"
        onClick={deleteSubjectEvent}
        startIcon={<DeleteIcon />}
      >
        {subjectName} | {subjectTiming}
      </Button>
    </div>
  );
};

export default SubjectItem;
