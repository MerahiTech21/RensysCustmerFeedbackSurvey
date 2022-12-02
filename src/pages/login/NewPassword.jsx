import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate()

  const passwordHandler = (e) => {
     setPassword(e.target.value);
  };
  const changePasswordHandler = () => {
    const err = validate(password);
    setError(err);
    if (!err) {
      navigate('/surveys')
    }
  }

  const validate = (password) => {
    var errorpassword = "";

  
    if (password.length > 10) {
      errorpassword = "Password Length Must Between 4 and 8 ";
    }
    if (password.length < 4) {
      errorpassword = "Password Length Must Between 4 and 8 ";
    }  if (!password) {
      errorpassword = "Enter New Password ";
    }
    return errorpassword;
  };
 

  return (
    <div className={`${classes.wraper} p-5`}>
      <Form>
        <Form.Group className="mb-4" controlId="otp">
          <Form.Label className="fw-bold">New Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            className={error ? classes.errorBorder : ""}
            onChange={passwordHandler}
          />
          <span className={classes.errorText}>{error}</span>
        </Form.Group>
        <Button
          className={`${classes.btn} w-100`}
          variant="none"
          onClick={changePasswordHandler}
        >
          Change Password
        </Button>
      </Form>
      <div className="d-flex justify-content-end mt-4">
      </div>
    </div>
  );
};
export default NewPassword;
