"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;

const app = express();


app.listen(PORT, () => console.log(`Listening on port, ${PORT}.`));