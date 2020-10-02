import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import AuthContext from "../../context/authContext/authContext";
import axios from "axios";
const Forgotten = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resettoken, setresettoken] = useState("");
  const [isRequestPassword, setisRequestPassword] = useState(true);

  const { loginUser, userAuth, errors, setError, clearError } = useContext(
    AuthContext
  );

  useEffect(() => {
    if (userAuth) {
      props.history.push("/");
    }
  }, [userAuth, props.history.push]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      let res = await axios.post(
        "http://localhost:5000/api/requestForgotpassword",
        { email }
      );
      setEmail("");
      console.log(res);
      setresettoken(res.data.token);
      setisRequestPassword(!isRequestPassword);
      setError({ msg: "Message Sent, Put in yout new password" });
    } catch (error) {
      if (error.response) setError({ msg: error.response.data.msg });
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    console.log(password);
    try {
      let res = await axios.post(
        `http://localhost:5000/api/forgotPassword/${resettoken}`,
        { newPassword: password }
      );
      console.log(res);
      setError({ msg: res.data.msg });
      setPassword("");
    } catch (error) {
      if (error.response) setError({ msg: error.response.data.msg });
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md="4"></Col>

          <Col md="6" lg="4">
            {errors !== null && (
              <button className="danger">
                {errors.msg ? errors.msg : "errors.error[0].msg"}
                <span onClick={() => clearError()}>X</span>
              </button>
            )}

            {isRequestPassword ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            ) : (
              <Form onSubmit={handleSubmit2}>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Forgotten;
