import { useRef } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useNavigate } from 'react-router-dom';

import styles  from "./css/Form.module.css"

const Login = () => {
    const AUTHENTICATE_URL = '/auth/authenticate'

    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const response = await axios.post(AUTHENTICATE_URL,
                JSON.stringify(data),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );
            
            const token = response.data;
            setAuth(token)

            navigate('../main', { replace: true });
            
        } catch (err) {

        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="email"> Email: </label>
                    <input type="email" id="email" autoComplete="off" required ref={emailRef}/>

                    <label htmlFor="password"> Password: </label>
                    <input type="password" id="password" autoComplete="off" required ref={passwordRef}/>

                    <button>Sign In</button>
                </form>
                <p>
                    Need an account?<br />
                    <span className="line">
                        <Link to="../register">Sign In</Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login