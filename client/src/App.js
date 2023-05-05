import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Home from "./home/Home";
import Todo from "./todo/Todo";
import api from "./api";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/users");
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const logout = async () => {
    await api.get("/users/logout");
    setUser("");
  };

  return (
    <Container>
      <Row className="text-center mt-5">
        <Col md={{ span: 10 }} className="mb-4">
          <h2>My Todo App</h2>
        </Col>
        {user && (
          <Col>
            <Button variant="danger" onClick={logout}>
              Logout
            </Button>
          </Col>
        )}
      </Row>
      <Row>
        {user ? (
          <Todo todolist={user.todos || []} />
        ) : (
          <Home setUser={setUser} />
        )}
      </Row>
    </Container>
  );
}

export default App;
