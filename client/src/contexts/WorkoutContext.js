import React, { createContext, useState } from "react";

export const WorkoutContext = createContext();

function WorkoutContextProvider(props) {
    const [workouts, setWorkouts] = useState([]);

    function addWorkout(description, duration, date) {
        setWorkouts([
            { description, duration, workout_date: date, id: Date.now().toString() },
            ...workouts
        ]);
    }

    function removeWorkout(id) {
        setWorkouts(workouts.filter(workout => workout.id !== id));
    }

    return (
        <WorkoutContext.Provider value={ {workouts, addWorkout, removeWorkout} }>
            {props.children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutContextProvider;