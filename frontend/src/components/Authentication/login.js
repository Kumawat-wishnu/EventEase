import React, {useContext,useState} from 'react';
import {Form,Button,Alert} from 'react-bootstrap';
import axios from 'axios';
import {Link, Navigate} from 'react-router-dom';
import './login.css';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate= useNavigate();
    // const { setIsLoggedIn } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3009/authentication/login', {
                email,
                password,
            }, { withCredentials: true });

            console.log(response.data);
            
            // Redirect or handle success as needed

            // setIsSubmitted(true);
            // setIsLoggedIn(true);
            setEmail('');
            setPassword('');
            navigate('/');
            window.location.reload();
            alert('Logged in successfully!');
            

        } catch (error) {
            console.error('Login error:', error.response.data.error);
            setError(error.response.data.error);
        }
    };

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="custom-button">
                    Login
                </Button>
            </Form>
            <div className="signup-link">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    );
}

export default Login;