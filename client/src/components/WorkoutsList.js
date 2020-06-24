import React, { useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';
import WorkoutDetails from "../components/WorkoutDetails";

export default function WorkoutsList() {
    const { workouts } = useContext(WorkoutContext);

    return workouts.length ? (
        <ul className="workouts-list">
            {workouts.map(workout => (
                <WorkoutDetails workout={workout} key={workout.id} />
            ))}
        </ul>
    ) : (
        <p>No workouts yet...</p>
    )
}
