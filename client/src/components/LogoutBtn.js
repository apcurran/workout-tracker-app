import React, { useContext } from 'react';
import { LoginStatusContext } from "../contexts/LoginStatusContext";
import { useHistory } from 'react-router-dom';


export default function Logout() {
    let history = useHistory();

    const { handleLoginStatus } = useContext(LoginStatusContext);

    function handleLogout() {
        if (localStorage.authToken) {
            localStorage.clear();
        }

        handleLoginStatus(); // trigger login status to false

        history.push("/user/login");
    }

    return (
        <button onClick={handleLogout} className="logout-btn">Log Out</button> 
    )
}