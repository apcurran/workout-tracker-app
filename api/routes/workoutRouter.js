"use strict";

const express = require("express");
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const { workoutValidation, workoutEditValidation } = require("../validation/workoutValidation");
const db = require("../../db/index");

router.get("/", verifyAuth, async (req, res) => {
    try {
        const user_id = req.user._id;

        const { rows } = await db.query(
            "SELECT * FROM workout WHERE workout.user_id = $1 ORDER BY workout.workout_date DESC",
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
        await workoutValidation(req.body);
        
    } catch (err) {
        return res.status(400).json({
            error: err.details[0].message
        });
    }

    try {
        const user_id = req.user._id;
        const { description, duration, workout_date } = req.body;

        const newWorkout = await db.query(
            "INSERT INTO workout (user_id, description, duration, workout_date) VALUES ($1, $2, $3, $4) RETURNING workout_id",
            [user_id, description, duration, workout_date]
        );

        res.status(201).json(newWorkout.rows[0].workout_id);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

router.patch("/:id", verifyAuth, async (req, res) => {
    try {
        await workoutEditValidation(req.body);
        
    } catch (err) {
        return res.status(400).json({
            error: err.details[0].message
        });
    }

    try {
        const { id } = req.params;
        const { description, duration, workout_date } = req.body;

        await db.query(
            "UPDATE workout SET description = $1, duration = $2, workout_date = $3 WHERE workout_id = $4",
            [description, duration, workout_date, id]
        );

        res.status(200).json({
            message: "Workout updated"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err
        });
    }
});

// router.patch("/:id", verifyAuth, async (req, res) => {
//     try {
//         await workoutEditValidation(req.body);
        
//     } catch (err) {
//         return res.status(400).json({
//             error: err.details[0].message
//         });
//     }
    
//     try {
//         const { id } = req.params;
//         const { duration } = req.body;

//         await db.query(
//             "UPDATE workout SET duration = $1 WHERE workout_id = $2",
//             [duration, id]
//         );

//         res.status(200).json({
//             message: "Workout updated!"
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             error: err
//         });
//     }
// });

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