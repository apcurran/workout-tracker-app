"use strict";

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.send("New workout added!");
});

module.exports = router;