"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const path = require("path");
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
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Routers
app.use("/api/workout", workoutRouter);
app.use("/api/user", userRouter);
// General Server Error Handling
app.use((err, req, res, next) => {
    console.error(err.message);

    return res.status(500).json({ error: err.message });
});

// Catchall handler to send back React's index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
})

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode and Listening on port, ${PORT}.`));