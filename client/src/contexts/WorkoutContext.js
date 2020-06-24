import React, { createContext, useState, useEffect } from "react";

export const WorkoutContext = createContext();

function WorkoutContextProvider(props) {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const API_URL = "/api/workout";
        const options = {
            headers: {
                Authorization: `Bearer ${localStorage.authToken}`
            }
        };

        fetch(API_URL, options)
            .then(response => response.json())
            .then(data => setWorkouts(data));
    }, []);

    function addWorkout(description, duration, date) {
        setWorkouts([
            { description, duration, workout_date: date, workout_id: Date.now().toString() },
            ...workouts
        ]);
    }

    function removeWorkout(id) {
        setWorkouts(workouts.filter(workout => workout.workout_id !== id));
    }

    return (
        <WorkoutContext.Provider value={ {workouts, addWorkout, removeWorkout} }>
            {props.children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutContextProvider;