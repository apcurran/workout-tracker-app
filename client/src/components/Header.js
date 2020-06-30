import React, { useContext, useEffect } from 'react';
import { LoginStatusContext } from "../contexts/LoginStatusContext";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

export default function Header() {
    const { loginStatus, handleLoginStatus } = useContext(LoginStatusContext);

    useEffect(() => {
        handleLoginStatus(); // Check login status on render
    });

    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="logo">Workout Tracker</Link>
                {loginStatus === true ? (
                    <ul className="nav__list">
                        <li className="nav__items">
                            <Link to="/" className="nav__link">About</Link>
                        </li>
                        <li className="nav__items">
                            <Link to="/user/workouts" className="nav__link">Workouts</Link>
                        </li>
                        <li className="nav__items">
                            <LogoutBtn />
                        </li>
                    </ul>
                ) : (
                    <ul className="nav__list">
                        <li className="nav__items">
                            <Link to="/" className="nav__link">About</Link>
                        </li>
                        <li className="nav__items">
                            <Link to="/user/signup" className="nav__link">Sign Up</Link>
                        </li>
                        <li className="nav__items">
                            <Link to="/user/login" className="nav__link">Log In</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    )
}
