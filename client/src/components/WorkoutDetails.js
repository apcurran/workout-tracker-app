import React, { useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext';
import TrashIcon from "../images/icon-trash.svg";

export default function WorkoutDetails({ workout }) {
    const { removeWorkout } = useContext(WorkoutContext);

    return (
        <li className="workout-list__item">
           <span>{workout.description}</span>
           <span>{workout.duration}</span>
           <span>{workout.workout_date}</span>
           <button onClick={() => removeWorkout(workout.workout_id)}>
               <img src={TrashIcon} alt="Trashcan icon"/>
            </button>
        </li>
    )
}
