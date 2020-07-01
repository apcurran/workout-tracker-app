import React, { useState, useCallback } from 'react';
import { useHistory } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    let history = useHistory();

    const handleSubmit = useCallback( async (event) => {
        event.preventDefault();

        const API_URL = "/api/user/signup";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
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

            history.push("/user/login");
    
        } catch (err) {
            console.error(err);
        }

    }, [username, email, password, history] );

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h1 className="form__title">Sign Up</h1>
                {error ? (
                    <h3 className="error">{error}</h3>
                ) : null}
                <div className="form-group">
                    <label htmlFor="username" className="form-group__label">Name</label>
                    <input
                        onChange={(event) => setUsername(event.target.value)}
                        type="text"
                        id="username"
                        className="form-group__input"
                    />
                </div>
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