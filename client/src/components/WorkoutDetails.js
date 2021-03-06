import React, { useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';
import TrashIcon from "../images/icon-trash.svg";

export default function WorkoutDetails({ workout }) {
    const { removeWorkout, editWorkoutModal } = useContext(WorkoutContext);

    return (
        <li className="workout-list__item">
           <span>{workout.description}</span>
           <span>{workout.duration}</span>
           <span className="workout-list__item__date">{workout.workout_date}</span>
           <button onClick={() => editWorkoutModal(workout.workout_id)} className="workout-list__item__edit-btn">edit</button>
           <button onClick={() => removeWorkout(workout.workout_id)} className="workout-list__item__delete-btn" aria-label="Delete">
               <img src={TrashIcon} alt="Trashcan icon"/>
            </button>
        </li>
    )
}
