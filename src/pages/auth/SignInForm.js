import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/UseRedirect";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";

function SignInForm() {
    const setCurrentUser = useSetCurrentUser()

    useRedirect('loggedIn')

    const [signInData, setSignInData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const [errors, setErrors] = useState({ x: 1 });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('/dj-rest-auth/login/', signInData);
            setCurrentUser(data.user)
            navigate('/')
        } catch (err) {
            setErrors(err.response?.data)
        }
    }

    return (
        <Container >
            <Row >
                <Col sm> </Col>
                <Row>
                    <h1 className={styles.HeadText}>Where are you running next?</h1>
                </Row>
                <Col sm> </Col>
            </Row>

            <Row>
                <Col sm> </Col>
                <Col xs={12} sm={8} md={6}>
                    <Container>
                        <Row className={styles.Header}>Please fill in the form to sign in</Row>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label className="d-none">Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    className={styles.Input}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.username?.map((message, idx) =>
                                <Alert variant="warning" key={idx}>{message}</Alert>)}

                            <Form.Group controlId="password">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    className={styles.Input}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.password?.map((message, idx) =>
                                <Alert variant="warning" key={idx}>{message}</Alert>)}


                            <Button variant="light" type="submit" className={`${btnStyles.Button} ${btnStyles.Wide}`}>
                                Sign in
                            </Button>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert variant="warning" className="mt-3" key={idx}>{message}
                                </Alert>
                            ))}
                        </Form>
                    </Container>
                    <Link className={styles.Link} to="/signup">
                        Don't have an account? <span>Sign up!</span>
                    </Link>
                </Col>
                <Col sm> </Col>
            </Row>
        </Container>
    )
}

export default SignInForm;