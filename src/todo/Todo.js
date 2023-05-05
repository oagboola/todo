import "./todo.css";
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
      await api.put(`/todos/${e.target.value}/status`, {
        status: e.target.checked ? "done" : "pending",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (e, todo) => {
    const updatedList = todos.map((td) => {
      if (td.id === todo.id) {
        const updatedItem = {
          ...td,
          description: e.target.value,
        };
        return updatedItem;
      }
      return td;
    });
    setTodos(updatedList);
  };

  const updateTodo = async (e, todo) => {
    try {
      await api.put(`/todos/${todo.id}`, { description: e.target.value });
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
              <ListGroup variant="flush">
                {todos.map((todo) => (
                  <ListGroup.Item action key={todo.id}>
                    <Form>
                      <Row>
                        <Col xs="auto">
                          <Form.Check
                            type="checkbox"
                            id="default-checkbox"
                            defaultChecked={todo.status === "done"}
                            onChange={handleStatusChange}
                            value={todo.id}
                          />
                        </Col>
                        <Col>
                          <Form.Control
                            placeholder="description"
                            aria-label="Description"
                            aria-describedby="basic-addon1"
                            value={todo.description}
                            onChange={(e) => {
                              handleUpdate(e, todo);
                            }}
                            onBlur={(e) => {
                              updateTodo(e, todo);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                updateTodo(e, todo);
                              }
                            }}
                          />
                        </Col>
                      </Row>
                    </Form>
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
