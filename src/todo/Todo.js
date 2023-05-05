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

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      const currList = todos;
      todos.filter((val, i, arr) => {
        if (val.id === id) {
          arr.splice(i, 1);
          return true;
        }
        return false;
      });
      setTodos([...currList]);
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
                        <Col xs="auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            onClick={() => {
                              handleDelete(todo.id);
                            }}
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                          </svg>
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
