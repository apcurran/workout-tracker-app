"use strict";

const express = require("express");
const router = express.Router();
const db = require("../../db/index");

router.get("/", async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM workout");
        
        res.send(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { user_id, description, duration } = req.body;
        const newWorkout = await db.query(
            "INSERT INTO workout (user_id, description, duration) VALUES ($1, $2, $3)",
            [user_id, description, duration]
        );

        res.send("New workout added!");
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.patch("/description/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        await db.query(
            "UPDATE workout SET description = $1 WHERE workout_id = $2",
            [description, id]
        );

        res.send("Workout updated!");

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.patch("/duration/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { duration } = req.body;

        await db.query(
            "UPDATE workout SET duration = $1 WHERE workout_id = $2",
            [duration, id]
        );

        res.send("Workout updated!");

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM workout WHERE workout_id = $1",
            [id]
        );

        res.send(`Workout with id, ${id} deleted!`);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;