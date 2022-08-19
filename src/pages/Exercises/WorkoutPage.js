import React from 'react';
import PageTemplate from "../../templates/PageTemplate";
import CountdownTimerWithSets from "./Components/CountdownTimerWithSets";
import RepCounter from "./Components/RepCounter";
import {useNavigate, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {getDatabase, child, ref, get, remove} from "firebase/database";
import {getAuth} from "firebase/auth";
import {ROUTES} from "../../constants";
import {EXERCISE_DATA} from "./DATA";

const WorkoutPage = () => {

  const {id} = useParams();

  const [workoutData, setWorkoutData] = React.useState({
    id: "",
    name: "",
    exercises: [],
    createdAt: 0
  });

  const auth = getAuth();

  const db = getDatabase();
  const userWorkoutsDBRef = ref(db, 'users/' + auth.currentUser.uid + "/workouts");
  const workoutDBRef = child(userWorkoutsDBRef, id);

  React.useEffect(() => {
    get(workoutDBRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setWorkoutData(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <PageTemplate>
      {
        workoutData.id === "" ? <WorkoutNotFoundComponent /> :
          <WorkoutGuidanceComponent workoutId={workoutData.id} name={workoutData.title} createdAt={workoutData.createdAt} workoutDBRef={workoutDBRef} exercises={workoutData.exercises} />
      }

    </PageTemplate>
  )
}


export default WorkoutPage;

const WorkoutGuidanceComponent = ({workoutId, name, createdAt, workoutDBRef, exercises = []}) => {

  const createdAtDate = new Date(createdAt).toDateString();

  // We will use this to progress and track the state of the exercise on
  const [currentExerciseOnIndex, setCurrentExerciseOnIndex] = React.useState(0);

  const navigate = useNavigate();

  const promptDeleteWorkout = () => {
    let userDeletionChoice = prompt("Are you sure you want to delete this workout? Type 'YES' to confirm (all caps).");
    if (userDeletionChoice === "YES") {
      deleteWorkout();
    }
  }

  const deleteWorkout = () => {
    remove(workoutDBRef).then(() => {
      alert("Workout " + name + "(id: " + workoutId + ") has been successfully deleted!");
      navigate(ROUTES.INDEX);
    }).catch((error) => {
      alert("Error deleting workout: " + error);
    });
  }

  if (exercises.length === 0) {
    return (
      <div className={"d-flex flex-grow flex-column"}>
        <h1>Workout</h1>
        <p className={"text-subtext"}>There are no exercises in this workout.</p>
      </div>
    )
  }

  return (
    <div className={"d-flex flex-column flex-grow"}>
      <div className={"d-flex flex-row justify-content-between align-items-center"}>
        <h1>Workout</h1>
        <button className={"btn btn-small btn-danger text-white"} onClick={promptDeleteWorkout}>Delete Workout 🗑</button>
      </div>
      <h3 className={"text-subtext"}>{name}</h3>
      <small>Created on {createdAtDate}</small>
      <small className={"text-subtext text-main-purple mt-1"}>Currently on exercise {currentExerciseOnIndex + 1} of {exercises.length}</small>

      <div className={"d-flex flex-grow flex-column"}>
        {
          exercises.map((exercise, index) => {
            return (<WorkoutExerciseCard key={index.toString()} exerciseId={exercise.exerciseId} sets={exercise.sets} reps={exercise.sets} index={index} seconds={exercise.seconds} totalCountExercises={exercises.length} currentlyOnExerciseIndex={currentExerciseOnIndex} setCurrentlyOnExerciseIndex={setCurrentExerciseOnIndex} />)
          })
        }
      </div>

    </div>
  )

}

const WorkoutExerciseCard = ({exerciseId, index, reps = 0, sets = 0, seconds = 0, currentlyOnExerciseIndex, totalCountExercises, setCurrentlyOnExerciseIndex}) => {

  const progressToNextExercise = () => {
    if (index < totalCountExercises - 1) {
      setCurrentlyOnExerciseIndex(index + 1);
    } else {
      alert("Workout Complete!");
    }
  }

  return (
    <div className={`card d-flex flex-column mt-4 flex-grow ${index === currentlyOnExerciseIndex} ? 'active-exercise-border' : 'inactive-exercise-border'`}>
      <div className={`card-body d-flex ${index === currentlyOnExerciseIndex ? 'flex-column' : 'flex-row'} flex-grow`}>

        {
          index === currentlyOnExerciseIndex ?
            <div className={"d-flex flex-column justify-content-center flex-grow align-items-center"}>
              <h2 className={"title mb-2"}>{EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].name}</h2>
              <img src={EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].photo} alt={EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].name} className={"main-exercise-image mb-2"}/>
            </div> :
            <div className={"d-flex flex-column"}>
              <img src={EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].photo} alt={EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].name} className={"card-image rounded"}/>
            </div>
        }
        {
          index !== currentlyOnExerciseIndex &&
          <>
            <div className={"horizontal-spacer-2"} />
            <div className={"d-flex flex-column ml-2"}>
              <small className={"text-subtext"}>{EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].name}</small>
              <h4 className={"text-subtext"}>Exercise {index + 1} of {totalCountExercises}</h4>
              <p>{sets} sets of {EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].isReps ? reps.toString() + ' reps' : seconds.toString() + ' seconds'}</p>
            </div>
          </>
        }

      </div>
      <div className={"card-text d-flex flex-column justify-content-center align-items-center flex-shrink mb-4"}>
        {
          EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].isReps && currentlyOnExerciseIndex === index &&
            <RepCounter reps={reps} sets={sets} done={progressToNextExercise} />
        }
        {
          !EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].isReps && currentlyOnExerciseIndex === index &&
          <CountdownTimerWithSets seconds={seconds} sets={sets} done={progressToNextExercise} />
        }

      </div>
    </div>
  )

}

const WorkoutNotFoundComponent = () => {
  return (
    <div>
      <h4 className={"text-subtext"}>Workout Not Found</h4>
      <Link to={ROUTES.CREATE_WORKOUT}>Go create a new workout 🏋🏽‍♀ >️</Link>
    </div>
  )
}