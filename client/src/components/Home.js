import React from 'react';
import Athlete from "../images/athlete.png";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="home-grid-container">
            <figure className="hero-container">
                <img src={Athlete} alt="Female athlete" className="hero-img"/>
                <div className="hero-box hero-box-outline"></div>
                <div className="hero-box hero-box-solid"></div>
                <div className="hero-box hero-box-outline"></div>
            </figure>
            <section className="info">
                <p className="info__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut pharetra sit amet aliquam id diam maecenas ultricies. Est placerat in egestas erat imperdiet sed euismod nisi. Tellus in metus vulputate eu scelerisque felis imperdiet proin. At augue eget arcu dictum varius duis at consectetur.
                </p>
                <Link to="/user/login" className="info__workouts-btn">Login</Link>
            </section>
        </div>
    )
}
