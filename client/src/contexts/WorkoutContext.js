import React, { createContext, useState, useEffect } from "react";

export const WorkoutContext = createContext();

function WorkoutContextProvider(props) {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Inital data
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

    async function addWorkout(description, duration, date) { 
        // Add workout to db
        const API_URL = `/api/workout`;
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: description,
                duration: duration,
                workout_date: date
            })
        };
        
        const response = await fetch(API_URL, options);
        const data = await response.json();
        
        if (data.hasOwnProperty("error")) {
            setError(data.error);
            
            return;
        }

        // Add to DOM
        setWorkouts([
            { description, duration, workout_date: date, workout_id: data },
            ...workouts
        ]);
    }

    async function removeWorkout(id) {
        // Remove from DOM
        setWorkouts(workouts.filter(workout => workout.workout_id !== id));

        // Remove from db
        const API_URL = `/api/workout/${id}`;
        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.authToken}`,
            }
        };

        const response = await fetch(API_URL, options);
        const data = await response.json();
    
        if (data.hasOwnProperty("error")) {
            setError(data.error);

            return;
        }
    }

    return (
        <WorkoutContext.Provider value={ {workouts, addWorkout, removeWorkout} }>
            {props.children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutContextProvider;