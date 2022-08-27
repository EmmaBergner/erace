import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/UseRedirect";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

const SignUpForm = () => {
    useRedirect('loggedIn')

    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });

    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({ x: 1 });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', signUpData)
            navigate('/signin')
        } catch (err) {
            setErrors(err.response?.data)
        }
    }
    return (
        <Container >
            <Row>
                <Col sm> </Col>
                <Col xs={12} sm={8} md={6}>

                    <Container>
                        <Row className={styles.Header}>Please fill in the form to sign up</Row>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label className="d-none">Username</Form.Label>
                                <Form.Control
                                    className={styles.Input}
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.username?.map((message, idx) =>
                                <Alert variant="warning" key={idx}>{message}</Alert>)}

                            <Form.Group controlId="password1">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control className={styles.Input}
                                    type="password"
                                    placeholder="Password"
                                    name="password1"
                                    value={password1}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.password1?.map((message, idx) =>
                                <Alert variant="warning" key={idx}>{message}</Alert>)}

                            <Form.Group controlId="password2">
                                <Form.Label className="d-none">Confirm password</Form.Label>
                                <Form.Control className={styles.Input}
                                    type="password"
                                    placeholder="Confirm password"
                                    name="password2"
                                    value={password2}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.password2?.map((message, idx) =>
                                <Alert variant="warning" key={idx}>{message}</Alert>)}

                            <Button variant="light" type="submit" className={`${btnStyles.Button} ${btnStyles.Wide}`}>
                                Sign up
                            </Button>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert variant="warning" className="mt-3" key={idx}>{message}
                                </Alert>
                            ))}
                        </Form>
                    </Container>
                    <Link className={styles.Link} to="/signin">
                        Have an account? <span>Sign in!</span>
                    </Link>
                </Col>
                <Col sm> </Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;