import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Logout({ handleLogin }) {
    let history = useHistory();

    function handleLogout() {
        if (localStorage.authToken) {
            localStorage.clear();
        }

        // handleLogin(); // trigger login status to false

        history.push("/user/login");
    }

    return (
        <button onClick={handleLogout} className="logout-btn">Log Out</button> 
    )
}