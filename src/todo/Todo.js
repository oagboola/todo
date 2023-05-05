import { useState } from "react";
import {
  Col,
  Container,
  Row,
  ListGroup,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import api from "../api";

function Todo({ todolist }) {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState(todolist);
  const handleClick = () => {
    const addTodo = async () => {
      try {
        const response = await api.post("/todos", { description: newTodo });
        setTodos([...todos, response.data]);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    addTodo();
  };
  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };
  const handleStatusChange = async (e) => {
    try {
      await api.post(`/todos/${e.target.value}/status`, {
        status: e.target.checked ? "done" : "pending",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6 }}>
          <Row className="justify-content-md-center">
            <h3>Todo list</h3>
          </Row>
          <Row className="mt-3">
            <Col>
              <ListGroup defaultActiveKey="#link1">
                {todos.map((todo) => (
                  <ListGroup.Item action key={todo.id}>
                    <Form.Check
                      type="checkbox"
                      id="default-checkbox"
                      label={todo.description}
                      defaultChecked={todo.status === "done"}
                      onChange={handleStatusChange}
                      value={todo.id}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-5">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Add item:</InputGroup.Text>
              <Form.Control
                placeholder="description"
                aria-label="Description"
                aria-describedby="basic-addon1"
                value={newTodo}
                onChange={handleChange}
              />
              <Button
                variant="primary"
                id="button-addon2"
                onClick={handleClick}
              >
                Submit
              </Button>
            </InputGroup>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Todo;