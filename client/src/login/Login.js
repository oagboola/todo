import { useState } from "react";
import { Button, Container, Col, Row, Form } from "react-bootstrap";
import api from "../api";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const handleClick = async () => {
    try {
      const response = await api.post("/users/login", formState);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 4 }}>
            <Row className="text-center">
              <h2>My Todo App</h2>
            </Row>
            <Row>
              <Form>
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
      </Container>
    </div>
  );
}

export default Login;
