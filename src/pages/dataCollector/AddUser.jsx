import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import classes from "./User.module.css";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { buttonAction } from "../../store/slices/ButtonSpinerSlice";
import { useSelector } from "react-redux";
import apiClient from "../../url";
import { encoderAction } from "../../store/slices/EncoderSlice";

function AddUser(props) {
  const [user, setUser] = useState({
    id: nanoid(),
    name: 'null',
    phoneNo: 'null',
    status: 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    phoneNo: "",
    status: 0,
  });
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.btn.isLoading);

  const editUser = props.user;

  useEffect(() => {
    setUser(editUser);
    // console.log('s2',props.user)
  }, [editUser]);

  const ValidateUser = (values) => {
    const errors = {}
    if(!values.name?.trim()){
        errors.name = 'User Name is Required'
    }if(!values.phoneNo?.trim()){
        errors.phoneNo = 'PhoneNumber is Required'
    }   
    return errors
  };

  const editHandler = async () => {
    const err = ValidateUser(user);
    setErrors(err);

    if (Object.values(err)?.length === 0) {
      dispatch(buttonAction.setBtnSpiner(true));
      try {
        const response = await apiClient.put(
          `/api/encoders/${user.id}`,
          user
        );
        if (response.status === 200) {
          dispatch(encoderAction.editEncoder(response.data))
          handleClose();
        }
      } catch (er) {
        console.log(er);
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
  };
  const saveHandler = async () => {
    const err = ValidateUser(user);
    setErrors(err);

    if (Object.values(err)?.length === 0) {
    

      try {  dispatch(buttonAction.setBtnSpiner(true));
      console.log("user", user);
        const response = await apiClient.post("/api/encoders", user);
        if (response.status === 201) {
          console.log("encoder", response.data);
          dispatch(encoderAction.addEncoder(response.data))
          handleClose();
        }
      } catch (er) {
        console.log(er);
        console.log("user", user);

      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
  };
  const handleClose = () => {
    setUser({});
    setErrors({});
    props.onClose();
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUser((prevuser) => {
      return {
        ...prevuser,
        [name]: value,
      };
    });
    if (event.target.value) {
      setErrors((prevErrors) => {
        return { ...prevErrors, [name]: "" };
      });
    }
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="bg-light"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-3">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={changeHandler}
                value={user.name}
                className={errors.name ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.name}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNo"
                onChange={changeHandler}
                value={user.phoneNo}
                className={errors.phoneNo ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.phoneNo}</span>
            </Form.Group>
         
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="none">
            Cancel
          </Button>
          {props.title === "Add Data Collector" ? (
            <Button
              onClick={saveHandler}
              variant="none"
              className={classes.btn}
            >
              <div className="d-flex align-items-center">
                <span>{props.title}</span>
                <span className="ms-2">
                  {isLoading && (
                    <Spinner animation="border" variant="light" size="sm" />
                  )}
                </span>
              </div>
            </Button>
          ) : (
            <Button
              onClick={editHandler}
              variant="none"
              className={classes.btn}
            >
              <div className="d-flex align-items-center">
                <span>{props.title}</span>
                <span className="ms-2">
                  {isLoading && (
                    <Spinner animation="border" variant="light" size="sm" />
                  )}
                </span>
              </div>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUser;
