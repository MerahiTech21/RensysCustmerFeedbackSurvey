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
  const [phoneNo, setPhoneNo] = useState("");
  const [error, setError] = useState("");
  const isLoading = useSelector((state) => state.btn.isLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const phoneHandler = (e) => {
    console.log("erro", error);
    setPhoneNo(e.target.value);
  };
  const validate = (value) => {

    var errorValues = "";
    if (!value) {
      errorValues = "Phone Number is Required";
    }

    return errorValues;
  };
  const forgotHandler = async (e) => { 
    e.preventDefault();
    const err = validate(phoneNo);
    setError(err);
    if (!err) {
      dispatch(buttonAction.setBtnSpiner(true));

      try {
        var response = await apiClient.post(
          "api/encoders/forgot-password",
          { phoneNo },
          {
            //   headers:{
            //     'Content-Type':'application/json',
            //     accept:'application/json'
            //   }
            //
          }
        );
        if (response.status === 200) {
          navigate(`/verify-otp?phoneNo=${phoneNo}`);
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
            <Form.Label className="fw-bold">Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={phoneNo}
              className={error ? classes.errorBorder : ""}
              onChange={phoneHandler}
            />
            <span className={classes.errorText}>{error}</span>
          </Form.Group>

          <Button
            className={`${classes.btn} w-100 mb-1`}
            variant="none"
            onClick={forgotHandler}
          >
            Send OTP
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
