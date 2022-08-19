import React from 'react';
import {getDatabase, ref, child, onValue, remove} from "firebase/database";
import {getAuth} from "firebase/auth";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../constants";

// This component is used to show the user all of their workouts.

const MyWorkoutsComponent = () => {

  const db = getDatabase();
  const auth = getAuth();
  const userWorkoutsDBRef = ref(db, 'users/' + auth.currentUser.uid + '/workouts');
  const [workouts, setWorkouts] = React.useState([]);

  React.useEffect(() => {
    // Get the user's workouts from the database
    let unsubscribe = onValue(userWorkoutsDBRef, (snapshot) => {
      const data = snapshot.val();
      // If data is not null, then save each workout to the workouts array
      if (data !== null) {
        const workoutsArray = [];
        for (let workout in data) {
          workoutsArray.push(data[workout]);
        }
        setWorkouts(workoutsArray);
      }
    });
    return () => unsubscribe();
  }, []);

  if (workouts.length === 0) {
    return (
      <div>
        <h3>You have no workouts yet!</h3>
        <Link to={ROUTES.CREATE_WORKOUT}><small>Go create your first 🏋🏽‍♀️ ></small></Link>
      </div>
    )
  } else {
    console.log(workouts);
    return (
      <div>
        <h3>Your Workouts {workouts.length > 0 && '(' + workouts.length.toString() + ')'}</h3>
        <Link className={"link"} to={ROUTES.CREATE_WORKOUT}>
          <button className={"btn btn-small btn-success"}>Create a new Workout ✏️</button>
        </Link>
        <div className={"d-flex flex-column mt-2"}>
          {workouts.map((workout, index) => {
            if (workout.exercises) {
            return (
              <WorkoutCard key={index} name={workout.title} id={workout.id} createdAt={workout.createdAt}
                           numberOfExercises={workout.exercises.length}/>
            )} else {
              return null;
            }
          })}
        </div>
      </div>
    )
  }

}

export default MyWorkoutsComponent;


const WorkoutCard = ({name, id, createdAt, numberOfExercises}) => {

  // Source: https://stackoverflow.com/a/63941389/5015219
  const createdAtDate = new Date(createdAt).toDateString();

  const promptDeleteWorkout = (id) => {
    let userDeletionChoice = prompt("Are you sure you want to delete this workout? Type 'YES' to confirm (all caps).");
    if (userDeletionChoice === "YES") {
      deleteWorkout(id);
    }
  }

  // This demonstrates understanding of the Firebase Realtime Database live updates subscription
  const deleteWorkout = (id) => {
    const db = getDatabase();
    const auth = getAuth();
    const userWorkoutsRef = ref(db, 'users/' + auth.currentUser.uid + '/workouts');
    const workoutToDeleteRef = child(userWorkoutsRef, id);
    remove(workoutToDeleteRef).then(() => {
      alert("Workout deleted successfully");
    }).catch((error) => {
      alert("Error deleting workout: " + error.toString());
    });
  }

  return (
    <div key={id} className={"card p-4 mb-2"}>
      <div className={"card-body d-flex flex-column"}>
        <Link to={"/workout/" + id} className={"link"} target={"_blank"}>
          <h6 className={"card-title text-main-purple"}>{name}</h6>
        </Link>
        <div className={"d-flex flex-row justify-content-between align-items-center my-auto"}>
          <div className={"d-flex flex-column justify-content-start align-items-start"}>
            <small className={"text-muted"}>{numberOfExercises} exercises</small>
            <small className={"text-muted"}>Created on {createdAtDate}</small>
          </div>
          <button className={"btn btn-small btn-danger text-white"} onClick={() => promptDeleteWorkout(id)}>Delete Workout 🗑</button>
        </div>
      </div>
    </div>
  )

}