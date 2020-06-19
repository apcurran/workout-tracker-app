"use strict";

const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const db = require("../../db/index");

router.get("/", verifyAuth, async (req, res) => {
    try {
        const user_id = req.user._id;

        const { rows } = await db.query(
            "SELECT * FROM workout WHERE workout.user_id = $1",
            [user_id]
        );
        
        res.status(200).json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.post("/", verifyAuth, async (req, res) => {
    try {
        const user_id = req.user._id;
        const { description, duration } = req.body;

        const newWorkout = await db.query(
            "INSERT INTO workout (user_id, description, duration) VALUES ($1, $2, $3)",
            [user_id, description, duration]
        );

        res.status(201).json({
            message: "New workout added!"
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.patch("/description/:id", verifyAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        await db.query(
            "UPDATE workout SET description = $1 WHERE workout_id = $2",
            [description, id]
        );

        res.status(200).json({
            message: "Workout updated!"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.patch("/duration/:id", verifyAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { duration } = req.body;

        await db.query(
            "UPDATE workout SET duration = $1 WHERE workout_id = $2",
            [duration, id]
        );

        res.status(200).json({
            message: "Workout updated!"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.delete("/:id", verifyAuth, async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM workout WHERE workout_id = $1",
            [id]
        );

        res.status(200).json({
            message: `Workout with id, ${id} deleted!`
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;