import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/UseRedirect";

function SignInForm() {
    const setCurrentUser = useSetCurrentUser()
    useRedirect('loogedIn')

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
                <Col>
                    <h1 className={styles.HeadText}>Where are you running next?</h1>
                </Col>
                <Col sm> </Col>
            </Row>
            <Row>
                <Col sm> </Col>
                <Col>
                    <>
                        <Container className={`${appStyles.Content} p-4`}>
                            <Row>
                                <Col>
                                    {/* <h1 className={styles.Header}>sign in</h1> */}

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


                                        <Button type="submit" className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}>
                                            Sign in
                                        </Button>
                                        {errors.non_field_errors?.map((message, idx) => (
                                            <Alert variant="warning" className="mt-3" key={idx}>{message}
                                            </Alert>
                                        ))}
                                    </Form>
                                </Col>
                            </Row>
                        </Container>

                        {/* <Container className={`mt-3 ${appStyles.Content}`}> */}
                        <Link className={styles.Link} to="/signup">
                            Don't have an account? <span>Sign up!</span>
                        </Link>
                        {/* </Container> */}
                    </>
                </Col>
                <Col sm> </Col>
            </Row>
        </Container>
    )
}

export default SignInForm;