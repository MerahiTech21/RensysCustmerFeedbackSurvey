import { Alert } from "@mui/material";
import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { buttonAction } from "../store/slices/ButtonSpinerSlice";
import apiClient from "../url";
import classes from "./Setting.module.css";
const Setting = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "success",
  });
  const isLoading = useSelector((state) => state.btn.isLoading);
  const dispatch=useDispatch()

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
    console.log('changed' ,e.value)
  };

  const submitPasswored = async () => {
    const err = validatePassword(data);
    setError(err);

    console.log('errors',Object.values(err).length)
    console.log('errors2',err)
    if (Object.values(err).length === 0) {
      try {
        dispatch(buttonAction.setBtnSpiner(true));

        const response = await apiClient.put("/api/users/password-reset", data);
        if (response.status === 200) {
          console.log('data',response.data)
        }
      } catch (error) {
        console.log('Error ',error)

      }
      finally{
        dispatch(buttonAction.setBtnSpiner(false));

      }
    }
  };
  const validatePassword = (data) => {
    const values = {};
    if (!data.oldPassword?.trim()) {
      values.oldPassword = "Old Password Required";
    }

    if (!data.newPassword?.trim()) {
      values.newPassword = "New Password Required";
    }
    if (!data.confirmPassword?.trim()) {
      values.confirmPassword = "Confirm Password Required";
    }
    if (
      data.confirmPassword?.trim() &&
      data.newPassword?.trim() &&
      data.newPassword !== data.confirmPassword
    ) {
      values.confirmPassword = "Confirm Password Not Matched";
    }
    return values;
  };

  return (
    <div className="d-flex flex-column bg-light shadow-sm border m-5">
      {showAlert.status == true && (
        <div className="">
          <Alert
            style={{
              position: "fixed",
              top: 10,
              right: 10,
              width: "50%",
              float: "right",
            }}
            variant="filled"
            severity={showAlert.type}
            action={setTimeout(
              () => setShowAlert({ status: false, type: "success" }),
              5000
            )}
            onClose={() => setShowAlert({ status: false, type: "success" })}
          >
            {/* ()=>setShowAlert(false) */}
            {showAlert.type == "error" ? (
              <div className="mx-5">Error While Saving</div>
            ) : (
              <div className="mx-5">Question Saved Successfully</div>
            )}
          </Alert>
        </div>
      )}

      <div className="mx-3 px-3 mt-3 py-3 border-bottom">Account Setting</div>

      <div className="mx-3 px-3 border-bottom">
        <h5>Name : Alemu Tebkew</h5>
      </div>
      <div className="mx-3 px-3 border-bottom">
        <h5>Email : alemteb1010@gmail.com</h5>
      </div>
      <div className="mx-3 px-3 border-bottom">
        <h5>Phone Number : 0938232169</h5>
      </div>
      <div className="align-self-end mx-3 px-3 my-3">
        <Button onClick={() => setShow(true)} variant="dark">
          Change Password
        </Button>
      </div>

      <Modal show={show} className="border">
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="text"
                name="oldPassword"
                className={error.oldPassword ? classes.errorBorder : ""}
                value={data.oldPassword}
                onChange={handleInput}
              />
              <span className={error.oldPassword ? classes.errorText : ""}>
                {error.oldPassword}
              </span>
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="text"
                name="newPassword"
                className={error.newPassword ? classes.errorBorder : ""}
                value={data.newPassword}
                onChange={handleInput}
              />
              <span className={error.newPassword ? classes.errorText : ""}>
                {error.newPassword}
              </span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="text"
                name="confirmPassword"
                className={error.confirmPassword ? classes.errorBorder : ""}
                value={data.confirmPassword}
                onChange={handleInput}
              />
              <span className={error.confirmPassword ? classes.errorText : ""}>
                {error.confirmPassword}
              </span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setError("");
              setData("");
              setShow(false);
            }}
            variant="white"
          >
            Cancel
          </Button>
          <Button onClick={submitPasswored} variant="dark">
            <span className="me-2">
              {isLoading && (
                <Spinner animation="border" variant="light" size="sm" />
              )}
            </span>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Setting;
