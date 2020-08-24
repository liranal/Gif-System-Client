import React from "react";
import Form from "./Form";
import { Button } from "@material-ui/core";

const LoginForm = ({ onLoginEvent, onLogOutEvent, isSignedIn }) => {
  const onLogInClick = (userName) => {
    onLoginEvent(userName);
  };

  const onLogOutClick = () => {
    onLogOutEvent();
  };

  const renderAuthButton = () => {
    if (isSignedIn) {
      return (
        <Button variant="outlined" color="secondary" onClick={onLogOutClick}>
          Sign Out
        </Button>
      );
    } else {
      return (
        <div>
          <Form
            label="Enter User Name: "
            fieldName="User Name"
            buttonName="Login"
            onClickEvent={onLogInClick}
            className="ui red google button"
          />
        </div>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default LoginForm;
