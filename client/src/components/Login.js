import React, { useState, useCallback, useContext } from 'react';
import { LoginStatusContext } from "../contexts/LoginStatusContext";
import { useHistory } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    let history = useHistory();

    const { handleLoginStatus } = useContext(LoginStatusContext);

    const handleSubmit = useCallback( async (event) => {
        event.preventDefault();

        const API_URL = "/api/user/login";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        };
    
        try {
            const response = await fetch(API_URL, options);
            const data = await response.json();
    
            if (data.hasOwnProperty("error")) {
                setError(data.error);
    
                return;
            }

            const token = data;

            localStorage.setItem("authToken", token);

            handleLoginStatus(); // Flips login status to true

            history.push("/user/workouts"); // Send to animal list page with admin rights
    
        } catch (err) {
            console.error(err);
        }

    }, [email, password, history, handleLoginStatus] );

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <h1 className="form__title">Log In</h1>
                {error ? (
                    <h3 className="error">{error}</h3>
                ) : null}
                <div className="form-group">
                    <label htmlFor="email" className="form-group__label">Email</label>
                    <input
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        id="email"
                        className="form-group__input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-group__label">Password</label>
                    <input
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        id="password"
                        className="form-group__input"
                    />
                </div>
                <button type="submit" className="form__submit">Submit</button>
            </form>
        </div>
    )
}