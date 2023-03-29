import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./Login.module.css";
import { Alert } from "@mui/material";
import { FormGroup, Spinner } from "react-bootstrap";
import apiClient from "../../url";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.btn.isLoading);

  const dispatch = useDispatch();
  const phoneNo = searchParams.get("phoneNo");
  const otpHandler = (e) => {
    setOtp(e.target.value);
  }
  setTimeout(() => setShowAlert(false), 1000);
  const validate = (otp) => {
    var errorOtp = "";

    if (otp.length > 6) {
      errorOtp = "Max Otp Length 6";
    }
    if (otp.length < 6) {
      errorOtp = "Min Otp Length 6";
    }
    if (!otp) {
      errorOtp = "Enter Code Sent to Your Email ";
    }
    return errorOtp;
  };

  const verifyHandler = async () => {
    const err = validate(otp);
    setError(err);

    if (!err) {
      dispatch(buttonAction.setBtnSpiner(true));

      try {

        var response = await apiClient.post("api/encoders/verify-token", {
          tokenCode: otp,
          phoneNo: phoneNo,
        });
        if (response.status === 200) {
          saveUserData(response.data);
          navigate("/change-password");
        }
      } catch (error) {
        console.log("Error " + error);
        setError("Invalid OTP");
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
  };
  const saveUserData = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({
      id: data.id,
      name: data.name,
      phoneNumber: data.phoneNo,
      survey: data.survey,
    }));
  };
  return (
    <div
     className={`${classes.wraper} mx-5 px-5  d-flex justify-content-center`}>
      <div className="bg-light border rounded m-5 p-5">
        <Form>
    

          <Form.Group className="mb-4" controlId="otp">
            <p className="text-success">Verification Code sent to {phoneNo}</p>
            <Form.Label className="fw-bold">Enter Otp</Form.Label>
            <Form.Control
              type="text"
              name="otp"
              className={error ? classes.errorBorder : ""}
              onChange={otpHandler}
            />
            <span className={classes.errorText}>{error}</span>
          </Form.Group>
          <Button
            className={`${classes.btn} w-100`}
            variant="none"
            onClick={verifyHandler}
          >
            Verify
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
export default VerifyOtp;
