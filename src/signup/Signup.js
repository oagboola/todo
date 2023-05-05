import { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import api from "../api";

function Signup({ setUser }) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
  });
  const handleClick = async () => {
    try {
      const response = await api.post("/users/register", formState);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <Row>
      <Col>
        <Row className="text-center">
          <h3>Signup</h3>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formState.name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formState.email || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formState.password || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              Submit
            </Button>
          </Form>
        </Row>
      </Col>
    </Row>
  );
}

export default Signup;
