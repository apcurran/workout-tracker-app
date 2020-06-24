import React from 'react';
import WorkoutsForm from "./WorkoutsForm";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutsList from "./WorkoutsList";

export default function Workouts() {
    return (
        <div className="workouts-grid-container">
            <section className="workouts-section">
                <WorkoutsForm />
                <WorkoutsList />
            </section>
            <div className="stripes"></div>
        </div>
    )
}
