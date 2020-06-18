"use strict";

const express = require("express");
const router = express.Router();
const db = require("../../db/index");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
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
    res.send("You are now logged in.");
});

module.exports = router;