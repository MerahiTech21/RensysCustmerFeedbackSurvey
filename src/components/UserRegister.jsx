import React from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const UserRegister = () => {
  const selectedSurvey = useSelector((state) => state.survey.selectedSurvey);
  const navigate=useNavigate()
  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <div className="row m-sm-0 p-sm-0 m-md-0 p-md-0 w-50 mb-4">
        <div className="col-6 col-md-12 col-sm-12">
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Name"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control placeholder="Name"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Region</Form.Label>
              <Form.Control placeholder="Region"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Zone</Form.Label>
              <Form.Control placeholder="Region"></Form.Control>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="mb-1">Woreda</Form.Label>
              <Form.Control placeholder="Region"></Form.Control>
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="align-self-end">
        <Form.Group>
          <Button className="px-3" variant="dark"
            onClick={() => navigate(`/surveys/${selectedSurvey.id}/preview`)}

          >Next
          <ArrowForwardIcon/>
          </Button>
        </Form.Group>
      </div>
    </div>
  );
};

export default UserRegister;
