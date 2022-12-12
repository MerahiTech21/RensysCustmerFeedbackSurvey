import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./Login.module.css";
import apiClient from "../../url";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoading = useSelector((state) => state.btn.isLoading);

  const dispatch = useDispatch();
  const email = searchParams.get("email");
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const changePasswordHandler = async () => {
    const err = validate(password);
    setError(err);
    if (!err) {
      dispatch(buttonAction.setBtnSpiner(true));

      try {
        console.log("params email", email);
        var response = await apiClient.post("api/users/reset-forgot-password", {
          newPassword: password,
        });
        if (response.status === 200) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.log("Error " + error);
        setError(error.response.data.msg);
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
  };

  const validate = (password) => {
    var errorpassword = "";

    if (password.length > 10) {
      errorpassword = "Password Length Must Between 4 and 8 ";
    }
    if (password.length < 4) {
      errorpassword = "Password Length Must Between 4 and 8 ";
    }
    if (!password) {
      errorpassword = "Enter New Password ";
    }
    return errorpassword;
  };

  return (
    <div
      className={`${classes.wraper} mx-5 px-5  d-flex justify-content-center`}
    >
      <div className="bg-light border rounded m-5 p-5">
        {" "}
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
            <span className="ms-2">
              {isLoading && (
                <Spinner animation="border" variant="light" size="sm" />
              )}
            </span>
          </Button>
        </Form>
        <div className="d-flex justify-content-end mt-4"></div>
      </div>
    </div>
  );
};
export default NewPassword;
