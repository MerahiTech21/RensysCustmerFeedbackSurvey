import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import InputGroup from "react-bootstrap/InputGroup";
import { Button } from "react-bootstrap";
import "./Questions.css";

export default function Questions() {
  return (
    <div className="m-5">
      <Container>
        <Row>
          <Col xs="6">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
              labore commodi error accusamus fugiat recusandae reiciendis.
              Veritatis vitae animi inventore impedit omnis! Eos doloremque eum
              corporis corrupti quo beatae quisquam.
            </p>
          </Col>
          <Col xs="3">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
              labore commodi error accusamus fugiat recusandae reiciendis.
              Veritatis vitae animi inventore impedit omnis! Eos doloremque eum
              corporis corrupti quo beatae quisquam.
            </p>
          </Col>

          <Col xs="3">
            <Form.Check type="switch" label="Required" />
            <Form.Select>
              <option>Multiple Choice</option>
              <option>Check Box</option>
              <option>Short Answer</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex  justify-content-end align-items-center gt-2">
            <Form.Check type="switch" label="Required" className="m-5" />
            <Form.Select className="w-25">
              <option>Multiple Choice</option>
              <option>Check Box</option>
              <option>Short Answer</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
        <Col className="d-flex  justify-content-end align-items-center gt-2">
              <Form.Control
                type="text"
                className="h-10 border-bottom-2 border-primary shadow-non"
                value={"Which one option is is for youjr fedback?"}
              />
              <Button
                variant="outline-secondary"
                className="m-5"
                id="button-addon1"
              >
                Cancel
              </Button>
          </Col>
        </Row>

        <Row className="ml-20 ">

        <Form.Control
                type="text"
                className="h-10 border-bottom-2 border-primary shadow-non"
                value={"Which one option is is for youjr fedback?"}
              />
        </Row>

        
        <Row>
        <Form.Control
                type="text"
                className="h-10 border-bottom-2 border-primary shadow-non"
                value={"Which one option is is for youjr fedback?"}
              />
        </Row>

        <Form.Control
                type="text"
                className="h-10 border-bottom-2 border-primary shadow-non"
                value={"Which one option is is for youjr fedback?"}
              />
        <Row>
            
        </Row>
      </Container>
      <hr className="mb-5" />
      <div>
        <InputGroup className="mb-3">
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </div>
      <Stack direction="horizontal " gap={2} className="col-md-5 mx-auto">
        <Form.Check type="switch" label="Required" />
        <Form.Select>
          <option>Multiple Choice</option>
          <option>Check Box</option>
          <option>Short Answer</option>
        </Form.Select>
      </Stack>
      <Stack direction="horizontal" gap={2} className="col-md-5 mx-auto">
        <Button variant="primary">Save changes</Button>
        <Button variant="outline-secondary">Cancel</Button>
      </Stack>
      \{" "}
    </div>
  );
}
