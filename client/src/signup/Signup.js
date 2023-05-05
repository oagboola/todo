import { useState } from "react";
import { Button, Col, Row, Form, Spinner, Alert } from "react-bootstrap";
import api from "../api";

function Signup({ setUser }) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        setIsLoading(true);
        const response = await api.post("/users/register", formState);
        setUser(response.data);
      } catch (error) {
        setShowAlert(true);
        setErrMessage(error.response.data.message || "Error signing up");
        console.log(error);
      }
    }
    setValidated(true);
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Row>
      <Col md={7}>
        <Row className="text-center">
          <h3>Signup</h3>
        </Row>
        <Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                placeholder="Enter name"
                value={formState.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                placeholder="Enter email"
                value={formState.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                required
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            <Row>
              <Col>
                <Button variant="primary" type="submit" disabled={isLoading}>
                  Submit
                </Button>
              </Col>
              {isLoading && (
                <Col>
                  <Spinner animation="border" variant="primary" />
                </Col>
              )}
            </Row>
          </Form>
        </Row>
      </Col>
      <Col>
        {showAlert && (
          <Alert variant="danger" dismissible>
            {errMessage}
          </Alert>
        )}
      </Col>
    </Row>
  );
}

export default Signup;
