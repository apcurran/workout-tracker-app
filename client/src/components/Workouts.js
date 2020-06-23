import React from 'react';
import WorkoutsList from "./WorkoutsList";

export default function Workouts() {
    return (
        <div className="workouts-grid-container">
            <WorkoutsList />
            <div className="stripes"></div>
        </div>
    )
}
