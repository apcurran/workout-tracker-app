import React, { useContext, useState } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';

export default function WorkoutsForm() {
    const { addWorkout } = useContext(WorkoutContext);
    const { error } = useContext(WorkoutContext);

    const [activity, setActivity] = useState("");
    const [duration, setDuration] = useState("");
    const [date, setDate] = useState("");

    function clearInputs() {
        setActivity("");
        setDuration("");
        setDate("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        // Call context function
        addWorkout(activity, duration, date);

        // Clear form inputs
        clearInputs();
    }

    return (
        <form onSubmit={handleSubmit} className="workouts-form">
            {error ? (
                <p className="error">{error}</p>
            ) : null}
            <div className="workouts-form__group">
                <label htmlFor="description" className="workouts-form__group__label">Activity</label>
                <input
                    value={activity}
                    onChange={(event) => setActivity(event.target.value)}
                    required
                    type="text"
                    id="description"
                    name="description"
                    className="workouts-form__group__input"
                />
            </div>
            <div className="workouts-form__group">
                <label htmlFor="duration" className="workouts-form__group__label">Duration</label>
                <input
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                    required
                    type="text"
                    id="duration"
                    name="duration"
                    className="workouts-form__group__input"
                />
            </div>
            <div className="workouts-form__group">
                <label htmlFor="workout_date" className="workouts-form__group__label">Date</label>
                <input
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    type="date"
                    id="workout_date"
                    name="workout_date"
                    className="workouts-form__group__input input--date"
                />
            </div>
            <button type="submit" className="workouts-form__submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26">
                    <path className="icon-plus" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/>
                </svg>
            </button>
        </form>
    )
}
