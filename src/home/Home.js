import Login from "../login/Login";
import Signup from "../signup/Signup";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

function Home({ setUser }) {
  const [showSignup, setShowSignup] = useState(true);
  const handleClick = () => {
    setShowSignup(!showSignup);
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={{ span: 4 }}>
          {showSignup ? (
            <Signup setUser={setUser} />
          ) : (
            <Login setUser={setUser} />
          )}
          {showSignup && (
            <div>
              Already have an account?
              <span onClick={handleClick}> Login</span>
            </div>
          )}
          {!showSignup && (
            <div>
              New User? <span onClick={handleClick}>Signup</span>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
