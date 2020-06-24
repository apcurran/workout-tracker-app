import React from 'react';

export default function WorkoutsForm() {
    return (
        <form className="workouts-form">
            <div className="workouts-form__group">
                <label htmlFor="" className="workouts-form__group__label">Activity</label>
                <input type="text" className="workouts-form__group__input"/>
            </div>
            <div className="workouts-form__group">
                <label htmlFor="" className="workouts-form__group__label">Duration</label>
                <input type="text" className="workouts-form__group__input"/>
            </div>
            <div className="workouts-form__group">
                <label htmlFor="" className="workouts-form__group__label">Date</label>
                <input type="date" className="workouts-form__group__input input--date"/>
            </div>
            <button type="submit" className="workouts-form__submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26">
                    <path class="icon-plus" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/>
                </svg>
            </button>
        </form>
    )
}
