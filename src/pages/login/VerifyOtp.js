import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { Alert } from "@mui/material";
import { FormGroup } from "react-bootstrap";
const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showAlert,setShowAlert]=useState(true)
  const navigate=useNavigate()

  const otpHandler = (e) => {
    setOtp(e.target.value);
  };
  setTimeout(()=>setShowAlert(false),1000)
  const validate = (otp) => {
    var errorOtp = "";

    if (!otp) {
      errorOtp = "Enter Code Sent to Your Email ";
    }
    if (otp.length > 4) {
      errorOtp = "Max Otp Length 4";
    }
    return errorOtp;
  };
  const verifyHandler = () => {
    const err = validate(otp);
    setError(err);
    if (!err) {
      navigate('/change-password')
    }
  };
  return (
    <div className={`${classes.wraper} p-5`}>
      <Form>
       
       {showAlert && (
          
          <Alert  style={{position:'absolute', top:10}} onClose={()=>setShowAlert(false)} variant="filled" severity="success">
          {/* ()=>setShowAlert(false) */}
            <p>Verification Code sent</p>
          </Alert>
      
       )}  
      
        <Form.Group className="mb-4" controlId="otp">
          <Form.Label className="fw-bold">Enter Otp</Form.Label>
          <Form.Control
            type="text"
            name="otp"
            className={error.otp ? classes.errorBorder : ""}
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
        </Button>
      </Form>
      <div className="d-flex justify-content-end mt-4">
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};
export default VerifyOtp;
