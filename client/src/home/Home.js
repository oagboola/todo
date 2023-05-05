import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import Login from "../login/Login";
import Signup from "../signup/Signup";

function Home({ setUser }) {
  const [showSignup, setShowSignup] = useState(true);
  const handleClick = () => {
    setShowSignup(!showSignup);
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={{ span: 6 }}>
          {showSignup ? (
            <Signup setUser={setUser} />
          ) : (
            <Login setUser={setUser} />
          )}
          {showSignup && (
            <div className="mt-4">
              Already have an account?
              <a href="#" onClick={handleClick}>
                {" "}
                Login
              </a>
            </div>
          )}
          {!showSignup && (
            <div className="mt-4">
              New User?{" "}
              <a href="#" onClick={handleClick}>
                Signup
              </a>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
