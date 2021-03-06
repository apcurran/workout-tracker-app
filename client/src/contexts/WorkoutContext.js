import React, { createContext, useState, useEffect, useContext } from "react";
import { LoginStatusContext } from "./LoginStatusContext";


export const WorkoutContext = createContext();

function WorkoutContextProvider(props) {
    const [workouts, setWorkouts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [currentWorkoutId, setCurrentWorkoutId] = useState("");

    const { loginStatus } = useContext(LoginStatusContext);

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
    }, [loginStatus]);

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
            console.log(data);
            setError(data.error);
            
            return;
        }

        // Add to DOM
        setWorkouts([
            { description, duration, workout_date: date, workout_id: data },
            ...workouts
        ]);
    }

    async function editWorkoutModal(id) {
        setIsEditing(true);
        setCurrentWorkoutId(id)
    }

    async function handleEditWorkoutSubmit(id, description, duration, workout_date) {
        // Update DOM
        const tempWorkouts = workouts.map(workout => {
            if (workout.workout_id === id) {
                return { ...workout, description, duration, workout_date };
            } else {
                return workout;
            }
        });

        setWorkouts(tempWorkouts);

        // Update from db
        const API_URL = `/api/workout/${id}`;
        const options = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: description,
                duration: duration,
                workout_date: workout_date
            })
        };

        const response = await fetch(API_URL, options);
        const data = await response.json();
    
        if (data.hasOwnProperty("error")) {
            setError(data.error);

            return;
        }

        
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
        <WorkoutContext.Provider value={ {workouts, isEditing, setIsEditing, addWorkout, currentWorkoutId, editWorkoutModal, handleEditWorkoutSubmit, removeWorkout, error, setError} }>
            {props.children}
        </WorkoutContext.Provider>
    );
}

export default WorkoutContextProvider;