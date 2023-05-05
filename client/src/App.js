import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./home/Home";
import Todo from "./todo/Todo";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

function App() {
  const loggedInUser = localStorage.getItem("user");
  const [user, setUser] = useState(loggedInUser);

  const handleClick = () => {
    localStorage.setItem("user", "");
    setUser("");
  };
  return (
    <Container>
      <Row className="text-center">
        <Col md={{ span: 10 }}>
          <h2>My Todo App</h2>
        </Col>
        {user && (
          <Col>
            <div onClick={handleClick}>Logout</div>
          </Col>
        )}
      </Row>
      <Row>{user ? <Todo /> : <Home setUser={setUser} />}</Row>
    </Container>
  );
}

export default App;
