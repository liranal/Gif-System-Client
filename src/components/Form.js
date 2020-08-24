import React, { useState } from "react";
import { Button } from "@material-ui/core";

const Form = ({ label, fieldName, buttonName, onClickEvent }) => {
  const [userName, setuserName] = useState("");

  const submitForm = (e) => {
    onClickEvent(userName);
  };
  return (
    <form
      className="ui form"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <label>{label}</label>
      <input
        type="text"
        placeholder={fieldName}
        onChange={(e) => setuserName(e.target.value)}
      ></input>
      <Button
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        {buttonName}
      </Button>
    </form>
  );
};
export default Form;
