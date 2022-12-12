import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import apiClient from "../../url";
import axios from "axios";
import Spiner from "../../Spiner";
import { Spinner } from "react-bootstrap";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const isLoading = useSelector((state) => state.btn.isLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailHandler = (e) => {
    console.log("erro", error);
    setEmail(e.target.value);
  };
  const validate = (value) => {
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    var errorValues = "";
    if (!value) {
      errorValues = "Email is Required";
    } else if (!regexExp.test(value)) {
      errorValues = "Invalid Email Address";
    }

    return errorValues;
  };
  const forgotHandler = async (e) => {
    e.preventDefault();
    const err = validate(email);
    setError(err);
    if (!err) {
      dispatch(buttonAction.setBtnSpiner(true));

      try {
        var response = await apiClient.post(
          "api/users/forgot-password",
          { email },
          {
            //   headers:{
            //     'Content-Type':'application/json',
            //     accept:'application/json'
            //   }
            //
          }
        );
        if (response.status === 200) {
          navigate(`/verify-otp?email=${email}`);
        }
      } catch (error) {
        console.log("Error " + error);
        setError(error.response.data.msg);
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
  };
  return (
    <div
      className={`${classes.wraper} d-flex justify-content-center`}>
      <div className="bg-light border rounded m-5 p-5">
        <Form>
          <Form.Group className="mb-4" controlId="loginemail">
            <Form.Label className="fw-bold">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              value={email}
              className={error ? classes.errorBorder : ""}
              onChange={emailHandler}
            />
            <span className={classes.errorText}>{error}</span>
          </Form.Group>

          <Button
            className={`${classes.btn} w-100 mb-1`}
            variant="none"
            onClick={forgotHandler}
          >
            Send Email
            <span className="ms-2">
              {isLoading && (
                <Spinner animation="border" variant="light" size="sm" />
              )}
            </span>
          </Button>
        </Form>
        <div className="d-flex justify-content-end mt-4">
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
