import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
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
    notify:""
  });

  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "success",
  });
  const isLoading = useSelector((state) => state.btn.isLoading);
  const dispatch=useDispatch()
  const [user,setUser]=useState({});
  useEffect(()=>{
    const user=localStorage.getItem('user');
    if(user){
         setUser(JSON.parse(user))

    }
  },[])

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
    if (e.target.value) {
      setError((prevErrors) => {
        return { ...prevErrors, [name]: "" };
      });
    }
    console.log('changed' ,e.value)
  };

  const submitPasswored = async () => {
    const err = validatePassword(data);
    setError({...err,notify:""});

    console.log('errors',Object.values(err).length)
    console.log('errors2',err)
    if (Object.values(err).length === 0) {
      try {
        dispatch(buttonAction.setBtnSpiner(true));

        const response = await apiClient.put("/api/encoders/password-reset", {...data,id:user?.id});
        if (response.status === 200) {
         setShow(false)
        } 
      } catch (error) {
        console.log('Error ',error)
        setError({...error,notify:error.response.data.msg})
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
    

      <div className="mx-3 px-3 mt-3 py-3 border-bottom fw-bold" >Account Setting</div>

      <div className="mx-3 px-3 border-bottom">
        <p>Name : {user?.name}</p>
      </div>
      <div className="mx-3 px-3 border-bottom">
        <p>Phone Number : {user?.phoneNo}</p>
      </div>
      <div className="align-self-end mx-3 px-3 my-3">
        <Button onClick={() => setShow(true)} variant="warning">
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
          <p className={classes.errorText+' pt-2'} >{error.notify}</p>
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
          <Button onClick={submitPasswored} variant="warning">
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
