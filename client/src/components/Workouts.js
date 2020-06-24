import React from 'react';
import WorkoutsForm from "./WorkoutsForm";
import WorkoutItem from "./WorkoutItem";
import WorkoutsList from "./WorkoutsList";

export default function Workouts() {
    return (
        <div className="workouts-grid-container">
            <section className="workouts-section">
                <WorkoutsForm />
                <WorkoutItem />
                <WorkoutsList />
            </section>
            <div className="stripes"></div>
        </div>
    )
}
