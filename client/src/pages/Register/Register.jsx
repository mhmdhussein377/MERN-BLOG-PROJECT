import axios from 'axios';
import React from 'react'
import {useState} from 'react';
import {Link} from 'react-router-dom';
import "./Register.css"

const Register = () => {

    const [username,
        setUsername] = useState("");
    const [email,
        setEmail] = useState("");
    const [password,
        setPassword] = useState("");
    const [error,
        setError] = useState(false);

    let handleSubmit = async(e) => {
        e.preventDefault();
        setError(false);

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username: username,
                email: email,
                password: password
            });
            res.data && window
                .location
                .replace("/login");
        } catch (error) {
            setError(true);
        }
    };

    return (
        <div className="register">
            <div className="registerTitle">Register</div>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="registerInput"
                    placeholder="Enter you username..."/>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="registerInput"
                    placeholder="Enter you email..."/>
                <label>Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    className="registerInput"
                    placeholder="Enter your password..."/>
                <button className="registerButton" type="submit">
                    Register
                </button>
            </form>
            <button className="registerRegisterButton">
                <Link to="/login">Login</Link>
            </button>
            {error && <span style={{color: "red"}}>Something went wrong!</span>}
        </div>
    );
}

export default Register