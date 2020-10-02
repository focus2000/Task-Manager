import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import AuthContext from "../../context/authContext/authContext";
import { Link } from "react-router-dom";

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, userAuth, errors, clearError } = useContext(AuthContext);

  useEffect(() => {
    if (userAuth) {
      props.history.push("/");
    }
  }, [userAuth, props.history.push]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    loginUser(user);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md="4"></Col>

          <Col md="6" lg="4">
            {errors !== null && (
              <button className="danger">
                {errors.msg ? errors.msg : errors.error[0].msg}
                <span onClick={() => clearError()}>X</span>
              </button>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
              <p>
                Don't Have an Account? <Link to="/signup">Signup</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResetPassword;
