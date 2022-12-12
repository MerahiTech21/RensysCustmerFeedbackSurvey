import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ValidateSurvey from "./validation";
import classes from "./Survey.module.css";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { surveyAction } from "../store/slices/ServeySlice";
import { buttonAction } from "../store/slices/ButtonSpinerSlice";
import { useSelector } from "react-redux";
import apiClient from "../url";

function AddSurvey(props) {
  const [survey, setSurvey] = useState({
    id: nanoid(),
    name: "",
    openingAt: "",
    closingAt: "",
    description: "",
    status: 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    openingAt: "",
    closingAt: "",
    description: "",
  });
  const dispatch = useDispatch();
  const isLoading=useSelector(state=>state.btn.isLoading)

  const formatSurveyDate=(date)=>{
    const todayDate = new Date(date); 
    const formatDate = todayDate.getDate() < 10 ? `0${todayDate.getDate()}`:todayDate.getDate();
    const formatMonth = todayDate.getMonth() < 10 ? `0${todayDate.getMonth()}`: todayDate.getMonth();
    const formattedDate = [todayDate.getFullYear(), formatMonth, formatDate].join('-');
    return formattedDate
  }   
   const editSurvey=props.survey

  useEffect(() => {

    setSurvey({...editSurvey,openingAt:formatSurveyDate(editSurvey.openingAt), closingAt:formatSurveyDate(editSurvey.closingAt)});
    // console.log('s2',props.survey)
  }, [editSurvey]);

  const editHandler = async () => {
    const err = ValidateSurvey(survey);
    setErrors(err);

    if (Object.values(err)?.length === 0) {
      dispatch(buttonAction.setBtnSpiner(true));
      try {
         const response = await apiClient.put(`/api/surveys/${survey.id}`, survey);
        if (response.status === 200) {
          // console.log('farmers',response.data)
          dispatch(surveyAction.editSurvey(response.data));
          handleClose();
        }
      } catch (er) {
        console.log(er)
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
    
  };
  const saveHandler = async () => {
    const err = ValidateSurvey(survey);
    setErrors(err);

    if (Object.values(err)?.length === 0) {
      dispatch(buttonAction.setBtnSpiner(true));
      try {
        const response = await apiClient.post("/api/surveys", survey);
        if (response.status === 201) {
          console.log('survey',response.data)
          dispatch(surveyAction.addSurvey(survey));
          handleClose();
        }
      } catch (er) {
        console.log(er)
      } finally {
        dispatch(buttonAction.setBtnSpiner(false));
      }
    }
    
  };
  const handleClose = () => {
    setSurvey({});
    setErrors({});
    props.onClose();
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setSurvey((prevSurvey) => {
      return {
        ...prevSurvey,
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
              <Form.Label>Survey Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={changeHandler}
                value={survey.name}
                className={errors.name ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.name}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                onChange={changeHandler}
                value={survey.description}
                className={errors.description ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.description}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="openingAt">
              <Form.Label>Opening At</Form.Label>
              <Form.Control
                type="date"
                name="openingAt"
                onChange={changeHandler}
                value={survey.openingAt}
                className={errors.openingAt ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.openingAt}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="closingAt">
              <Form.Label>Closing At</Form.Label>
              <Form.Control
                type="date"
                name="closingAt"
                onChange={changeHandler}
                value={survey.closingAt}
                className={errors.closingAt ? classes.errorBorder : ""}
              />
              <span className={classes.errorText}>{errors.closingAt}</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
    {  props.title === 'Add Survey' ? (  <Button onClick={saveHandler} variant="none" className={classes.btn}>
            <div className="d-flex align-items-center">
              <span>{props.title}</span>
              <span className="ms-2">
                {isLoading && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}
              </span>
            </div>
          </Button>
          ):(
          <Button onClick={editHandler} variant="none" className={classes.btn}>
            <div className="d-flex align-items-center">
              <span>{props.title}</span>
              <span className="ms-2">
                {isLoading && (
                  <Spinner animation="border" variant="light" size="sm" />
                )}
              </span>
            </div>
          </Button>
          )
          }
          <Button onClick={handleClose} variant="none" className={classes.btn}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSurvey;
