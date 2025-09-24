import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import login_image from "../assets/images/login.png";
import google from "../assets/images/google.png";
import twitter from "../assets/images/twitter.png";
import facebook from "../assets/images/face.png";
import linkedin from "../assets/images/linked.png";

import './../index.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        if (password.length < 8) return 'Password must be at least 8 characters long.';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one capital letter.';
        if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
        if (!/[^A-Za-z0-9]/.test(password)) return 'Password must contain at least one symbol.';
        return '';
    };

    const validateUsernameOrEmail = (value) => {
        const trimmedValue = value.trim();
        if (!trimmedValue) return 'Email is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(trimmedValue)) return 'Please enter a valid email address.';
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userErr = validateUsernameOrEmail(username);
        const error = validatePassword(password);
        setUsernameError(userErr);
        if (userErr || error) {
            setPasswordError(error);
            return;
        }
        setPasswordError('');
        setUsernameError('');
        navigate('/home');
    };

    return (
        <Container fluid className="d-flex align-items-center justify-content-center">
            <Row className="w-100 mt-7 mt-md-0">
                <Col md={6} className="p-4 p-md-5">
                    <h2 className="mb-4 fs-24 fs-md-32 text-center text-md-left">Sign In</h2>

                    <div className="d-flex pb-3 fs-7 fs-md-5">
                        <div className="pe-2">New User?</div>
                        <div className="hover-underline">
                            Create an account
                        </div>
                    </div>

                    <Form noValidate onSubmit={handleSubmit}>
                        {/* Email */}
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control
                                type="email"
                                placeholder="Email address"
                                value={username}
                                isInvalid={!!usernameError}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setUsernameError(validateUsernameOrEmail(e.target.value));
                                }}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {usernameError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                isInvalid={!!passwordError}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (passwordError) {
                                        setPasswordError(validatePassword(e.target.value));
                                    }
                                }}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="keepSignedIn">
                            <Form.Check type="checkbox" label="Keep me signed in" />
                        </Form.Group>

                        <Button type="submit" variant="dark" className="w-100 mb-3">
                            Sign In
                        </Button>
                    </Form>

                    <div className="text-center mt-4">
                        <div class="d-flex align-items-center my-3">
                            <div class="flex-grow-1 border-top border-1"></div>
                                <span class="mx-2 fw-semibold text-dark">Or Sign In With</span>
                            <div class="flex-grow-1 border-top border-1"></div>
                        </div>
                        <div className="d-flex justify-content-center gap-3 mt-2">
                            <img src={google} alt="Login" width={40} />
                            <img src={facebook} alt="Login" width={40} />
                            <img src={linkedin} alt="Login" width={40} />
                            <img src={twitter} alt="Login" width={40} />
                            

                        </div>
                    </div>
                </Col>

                <Col md={6} className="d-none d-md-flex justify-content-center align-items-center p-5">
                    <img src={login_image} alt="Login" width={200} />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;