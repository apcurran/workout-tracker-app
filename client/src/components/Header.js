import React from 'react';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="logo">Workout Tracker</Link>
                <ul className="nav__list">
                    <li className="nav__items">
                        <Link to="/" className="nav__link">About</Link>
                    </li>
                    <li className="nav__items">
                        <Link to="/workouts" className="nav__link">Workouts</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
