"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
// Import Routes
const workoutRouter = require("./api/routes/workoutRouter");
const userRouter = require("./api/routes/userRouter");

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Middleware
app.use(express.json());

// Routers
app.use("/api/workout", workoutRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode and Listening on port, ${PORT}.`));