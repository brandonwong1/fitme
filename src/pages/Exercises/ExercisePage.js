import React from "react";
import {useParams} from "react-router-dom";
import {EXERCISE_DATA} from "./DATA";
import ExerciseInfoComponent from "./Components/ExerciseInfoComponent";
import ExerciseNotFoundComponent from "./Components/ExerciseNotFoundComponent";


const ExercisePage = () => {

  const {id} = useParams();

  console.log("Id: " + id);

  if (EXERCISE_DATA.filter(exercise => exercise.id === id).length === 0) {
    return <ExerciseNotFoundComponent />
  } else {
    return <ExerciseInfoComponent exercise={EXERCISE_DATA.filter(exercise => exercise.id === id)[0]} />
  }
}

export default ExercisePage;
