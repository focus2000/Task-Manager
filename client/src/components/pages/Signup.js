import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import AuthContext from "../../context/authContext/authContext";
import { Link } from "react-router-dom";

const Signup = (props) => {
  const { userAuth, errors, setError, clearError, registerUser } = useContext(
    AuthContext
  );

  useEffect(() => {
    if (userAuth) {
      props.history.push("/");
    }
  }, [userAuth, props.history.push]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    clearError();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser({ name, email, password });
    clearError();
  };

  return (
    <Container>
      <Row>
        <Col md="4"></Col>

        <Col md="6" lg="4">
          <Form onSubmit={handleSubmit}>
            {errors !== null && (
              <button className="danger">
                {errors.msg ? errors.msg : errors.error[0].msg}
                <span onClick={() => clearError()}>X</span>
              </button>
            )}

            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Sign-Up
            </Button>
          </Form>
          <p>
            Already have an Account? <Link to="/login">Login</Link>
          </p>

        
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
