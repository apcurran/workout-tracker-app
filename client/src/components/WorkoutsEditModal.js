import React, { useState } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';

export default function WorkoutsEditModal() {
    const [editActivity, setEditActivity] = useState("");
    const [editDuration, setEditDuration] = useState("");
    const [editDate, setEditDate] = useState("");

    return (
        <section className="edit-modal">
            <form className="edit-modal__form">
            <div className="workouts-form__group">
                <label htmlFor="description" className="workouts-form__group__label">Activity</label>
                <input
                    value={editActivity}
                    onChange={(event) => setEditActivity(event.target.value)}
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
                    value={editDuration}
                    onChange={(event) => setEditDuration(event.target.value)}
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
                    value={editDate}
                    onChange={(event) => setEditDate(event.target.value)}
                    required
                    type="date"
                    id="workout_date"
                    name="workout_date"
                    className="workouts-form__group__input input--date"
                />
            </div>
            </form>
        </section>
    )
}
