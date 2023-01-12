import axios from 'axios';
import React, { useRef } from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import "./Login.css"

const Login = () => {

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        } catch (error) {
            dispatch({type: "LOGIN_FAILURE"});
        }
    };

    return (
        <div className='login'>
            <div className="loginTitle">Login</div>
            <form className="loginForm" onClick={handleSubmit}>
                <label>username</label>
                <input ref={userRef} type="text" className='loginInput' placeholder='Enter you username...' />
                <label>Password</label>
                <input ref={passwordRef} type="password" className='loginInput' placeholder='Enter your password...' />
                <button className='loginButton' type='submit' disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton"><Link to="/register">Register</Link></button>
        </div>
    )
}

export default Login