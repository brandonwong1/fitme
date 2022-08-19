import React from 'react';

// Make a counter in react that counts up from 0 to the given prop called "reps".
// The counter should be styled with Bootstrap.
// The counter should have an increment button, a decrement button, and a reset button.
// This counter is to keep track of the number of reps a user has done during a workout.
// The counter will be used in the WorkoutPage component.
// This component also takes in another prop called "sets" which is the number of sets the user wants to do.
// Once the current count hits the number of reps, the counter should reset to 0 and the number of sets should decrement by 1.
// The user can reset the number of reps completed as well as the number of sets completed.

const RepCounter = ({exerciseName = null, reps, sets, done=null}) => {

  const [repsCompleted, setRepsCompleted] = React.useState(0);
  const [setsCompleted, setSetsCompleted] = React.useState(0);

  const incrementReps = () => {
    if (setsCompleted < sets) {
      if (repsCompleted < reps) {
        setRepsCompleted(repsCompleted + 1);
      } else {
        setRepsCompleted(0);
        setSetsCompleted(setsCompleted + 1);
      }
    }
  }

  const decrementReps = () => {
    if (setsCompleted < sets) {
      if (repsCompleted > 0) {
        setRepsCompleted(repsCompleted - 1);
      }
    }
  }

  const resetReps = () => {
    setRepsCompleted(0);
  }

  const resetSets = () => {
    setSetsCompleted(0);
  }

  const resetAll = () => {
    setRepsCompleted(0);
    setSetsCompleted(0);
  }

  return (
    <div className={"mx-auto card d-flex flex-shrink justify-content-center align-items-center p-2"}>

      {/* If we include the optional Exercise name, then show it for the card */}
      {exerciseName && <h2 className={"title"}>{exerciseName}</h2>}

      <div className={"card-title text-center row"}>

        <div className={"d-flex col-sm flex-grow"}>
          <h1>{repsCompleted}/{reps}</h1>
          <small className={"flex-grow"}>Reps Done</small>
        </div>

        <div className={"d-flex col-sm flex-grow"}>
          <h1>{setsCompleted}/{sets}</h1>
          <small className={"flex-grow"}>Sets Done</small>
        </div>

      </div>

      <div className="card-body d-flex flex-column flex-grow">

        {/* Row for Reps buttons */}
        <small>Reps Controller</small>
        <div className={"d-flex flex-row"}>
          <button className={`btn ${repsCompleted === reps ? 'btn-warning' : 'btn-primary'} btn-sm`} onClick={incrementReps}>{repsCompleted === reps ? 'Start next set' : 'Increment'}</button>
          <div className="mx-1"/>
          <button className={"btn btn-primary btn-sm"} onClick={decrementReps}>Decrement</button>
        </div>

        {/* Row for Resetting */}
        <small>Reset</small>
        <div className={"d-flex flex-row"}>
          <button className={"btn btn-secondary btn-sm"} onClick={resetReps}>Reset Reps</button>
          <div className="mx-1"/>
          <button className={"btn btn-secondary btn-sm"} onClick={resetSets}>Reset Sets</button>
          <div className="mx-1"/>
          <button className={"btn btn-secondary btn-sm"} onClick={resetAll}>Reset All</button>
        </div>

        {
          setsCompleted >= sets && done &&
          <>
            <small>Go on to the next exercise</small>
            <button className={"btn btn-success btn-sm text-white"} onClick={done}>Done</button>
          </>
        }
      </div>

    </div>
  );

};

export default RepCounter;