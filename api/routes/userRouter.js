"use strict";

const express = require("express");
const router = express.Router();
const db = require("../../db/index");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    res.send("Registering account...");
});

router.post("/login", async (req, res) => {
    res.send("Registering account...");
});

module.exports = router;