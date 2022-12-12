import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useParams } from "react-router-dom";
import classes from "./UserRegister.module.css";
import { userAction } from "../store/slices/UserSlice";
import { useEffect } from "react";

const UserRegister = (props) => {
  const selectedSurvey = useSelector((state) => state.survey.selectedSurvey);
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    region: "",
    zone: "",
    woreda: "",
    kebele: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    region: "",
    zone: "",
    woreda: "",
    kebele: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const prevData = { ...location.state };

  const surveyId = params.surveyId;
  const prev = useSelector((state) => state.user.farmer);

  useEffect(() => {
    setUser(prev);
  }, [location]);
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((preUser) => {
      return { ...preUser, [name]: value };
    });
    // setErrors((preErrors) => {
    //   return { ...preErrors, [name]: '' };
    // });
  };

  const handleUserData = () => {
    console.log("hello");
    const err = validateData(user);
    console.log("err", err);
    setErrors(err);
    if (Object.values(err)?.length === 0) {
      try {
        console.log("try", "yes");
        dispatch(userAction.setFarmer(user));
        if (props.type === "preview") {
          navigate(`/surveys/${surveyId}/preview`);
        } else {
          navigate(`/fill-answer/${surveyId}`);
        }
      } catch (error) {}
    }
  };

  const validateData = (data) => {
    const error = {};
    if (!data.name?.trim()) {
      error.name = "Name Required";
    }
    if (!data.phoneNumber?.trim()) {
      error.phoneNumber = "Phone Number Required";
    }
    if (!data.region?.trim()) {
      error.region = "Region Required";
    }
    if (!data.zone?.trim()) {
      error.zone = "Zone Required";
    }
    if (!data.woreda?.trim()) {
      error.woreda = "Woreda Required";
    }
    if (!data.kebele?.trim()) {
      error.kebele = "Kebele Required";
    }
    return error;
  };
  return (
    <div className="">
      <Container>
        <Row className="mb-2 justify-content-center">
          <Col xs={12}  lg={6} className="m-2">
            <Form className="bg-light rounded border">
              <Form.Group className="m-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={user.name}
                  name="name"
                  onChange={changeHandler}
                  className={errors.name ? classes.errorBorder : ""}
                />
                <span className={errors.name ? classes.errorText : ""}>
                  {errors?.name}
                </span>
              </Form.Group>
              <Form.Group className="m-2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  value={user.phoneNumber}
                  name="phoneNumber"
                  onChange={changeHandler}
                  className={errors.phoneNumber ? classes.errorBorder : ""}
                />
                <span className={errors.phoneNumber ? classes.errorText : ""}>
                  {errors?.phoneNumber}
                </span>
              </Form.Group>
              <Form.Group className="m-2">
                <Form.Label>Region</Form.Label>
                <Form.Control
                  value={user.region}
                  name="region"
                  onChange={changeHandler}
                  className={errors.region ? classes.errorBorder : ""}
                />
                <span className={errors.region ? classes.errorText : ""}>
                  {errors?.region}
                </span>
              </Form.Group>
              <Form.Group className="m-2">
                <Form.Label>Zone</Form.Label>
                <Form.Control
                  value={user.zone}
                  name="zone"
                  onChange={changeHandler}
                  className={errors.zone ? classes.errorBorder : ""}
                />
                <span className={errors.zone ? classes.errorText : ""}>
                  {errors?.zone}
                </span>
              </Form.Group>
              <Form.Group className="m-2">
                <Form.Label className="mb-1">Woreda</Form.Label>
                <Form.Control
                  value={user.woreda}
                  name="woreda"
                  onChange={changeHandler}
                  className={errors.woreda ? classes.errorBorder : ""}
                />
                <span className={errors.woreda ? classes.errorText : ""}>
                  {errors?.woreda}
                </span>
              </Form.Group>
              <Form.Group className="m-2">
                <Form.Label className="mb-1">Kebele</Form.Label>
                <Form.Control
                  value={user.kebele}
                  name="kebele"
                  onChange={changeHandler}
                  className={errors.kebele ? classes.errorBorder : ""}
                />
                <span className={errors.kebele ? classes.errorText : ""}>
                  {errors?.kebele}
                </span>
              </Form.Group>
            </Form>
          </Col>
        </Row>{" "}
        <Row className="justify-content-center">
        <Col  xs={12} lg={6} className="m-2 justify-content-end">
            <Button
              className="px-3"
              variant="dark"
              onClick={() => handleUserData()}
            >
              Next
              <ArrowForwardIcon />
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserRegister;
