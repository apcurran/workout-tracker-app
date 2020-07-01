import React, { useState, useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';

export default function WorkoutsEditModal() {
    const [editActivity, setEditActivity] = useState("");
    const [editDuration, setEditDuration] = useState("");
    const [editDate, setEditDate] = useState("");

    const { isEditing, setIsEditing, currentWorkoutId, handleEditWorkoutSubmit } = useContext(WorkoutContext);

    const showHideClassName = isEditing ? "edit-modal edit-modal--show" : "edit-modal";

    function handleEditSubmit(event) {
        event.preventDefault();
        // Send data to context
        handleEditWorkoutSubmit(currentWorkoutId, editActivity, editDuration, editDate);

        setIsEditing(false);
    }

    function closeEditModal(event) {
        setIsEditing(false);
    }

    return (
        <section onClick={closeEditModal} className={showHideClassName}>
            <form onSubmit={handleEditSubmit} onClick={(event) => event.stopPropagation()} className="edit-modal-form">
                <h2 className="edit-modal-form__title">Edit Workout</h2>
                <div className="edit-modal-form__group">
                    <label htmlFor="description" className="edit-modal-form__group__label">Activity</label>
                    <input
                        value={editActivity}
                        onChange={(event) => setEditActivity(event.target.value)}
                        required
                        type="text"
                        id="description"
                        name="description"
                        className="edit-modal-form__group__input"
                    />
                </div>
                <div className="edit-modal-form__group">
                    <label htmlFor="duration" className="edit-modal-form__group__label">Duration</label>
                    <input
                        value={editDuration}
                        onChange={(event) => setEditDuration(event.target.value)}
                        required
                        type="text"
                        id="duration"
                        name="duration"
                        className="edit-modal-form__group__input"
                    />
                </div>
                <div className="edit-modal-form__group">
                    <label htmlFor="workout_date" className="edit-modal-form__group__label">Date</label>
                    <input
                        value={editDate}
                        onChange={(event) => setEditDate(event.target.value)}
                        required
                        type="date"
                        id="workout_date"
                        name="workout_date"
                        className="edit-modal-form__group__input input--date"
                    />
                </div>
                <button type="submit" className="edit-modal-form__submit">Done</button>
            </form>
        </section>
    )
}
