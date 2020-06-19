"use strict";

const express = require("express");
const router = express.Router();
const db = require("../../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupValidation, loginValidation } = require("../validation/userValidation");

router.post("/signup", async (req, res) => {
    try {
        await signupValidation(req.body);

    } catch (err) {
        return res.status(400).json({
            error: err.details[0].message
        });
    }

    try {
        const { username, email, password } = req.body;
        console.log(email);

        const emailExists = await db.query(
            "SELECT * FROM workout_user WHERE workout_user.email = $1",
            [email]
        );

        if (emailExists.rows.length > 0) {
            return res.status(400).json({
                error: "Email already exists."
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Add new user to db
        const user = await db.query(
            "INSERT INTO workout_user (username, email, password) VALUES ($1, $2, $3)",
            [username, email, hashedPassword]
        );

        res.status(201).json({
            message: "User created!"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        await loginValidation(req.body);
        
    } catch (err) {
        return res.status(400).json({
            error: err.details[0].message
        });
    }

    try {
        const { email, password } = req.body;

        // Check if email exists
        const userResult = await db.query(
            "SELECT * FROM workout_user WHERE workout_user.email = $1",
            [email]
        );

        const user = userResult.rows[0];

        console.log(user);

        if (user.length === 0) {
            return res.status(400).json({
                error: "Email is not found."
            });
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                error: "Invalid password"
            });
        }

        // Create and assign token
        const token = jwt.sign({ _id: user.user_id }, process.env.TOKEN_SECRET);

        res.header("Authorization", `Bearer ${token}`).json(token);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;