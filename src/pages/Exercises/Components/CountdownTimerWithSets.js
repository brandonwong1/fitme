import React from "react";

// Make a countdown timer that is a React component styled with Bootstrap
// This component will be used in the WorkoutPage component
// The timer will be used to keep track of elapsed time during a workout and increment the number of completed sets.
// It takes in the number of seconds as a prop and counts down from that number.
// The component takes in another prop "sets" which is the number of sets the user wants to do. We increment this number when the timer completes.
// Once a completedSet is incremented, the countdown timer stops running and resets back to the number of seconds passed in as a prop.
// Users can start, stop, and reset the timer.
// Users can also reset the number of sets completed.

// done is a callback function to advance to the next exercise

const CountdownTimerWithSets = ({exerciseName=null, seconds, sets, done=null}) => {

  const [countdown, setCountdown] = React.useState(seconds);
  const [timerOn, setTimerOn] = React.useState(false);
  const [setsCompleted, setSetsCompleted] = React.useState(0);

  React.useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        // If the countdown reaches 0, then stop the timer
        if (countdown === 0) {
          setTimerOn(false);
          setSetsCompleted(setsCompleted + 1);
          setCountdown(seconds + 1);
        }
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    } else if (!timerOn && countdown !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [setsCompleted, countdown, seconds, timerOn]);

  const startTimer = () => {
    setTimerOn(true);
  }

  const stopTimer = () => {
    setTimerOn(false);
  }

  const resetTimer = () => {
    setCountdown(seconds);
    setTimerOn(false);
  }

  const resetSets = () => {
    setSetsCompleted(0);
  }

  return (
    <div className="mx-auto card d-flex flex-shrink justify-content-center align-items-center countdown-timer p-2">
      {/* If we include the optional Exercise name, then show it for the card */}
      {exerciseName && <h2 className={"title"}>{exerciseName}</h2>}

      <div className={"card-title text-center row"}>
        <div className={"d-flex col-sm flex-grow"}>
          <h1>{countdown}</h1>
          <small className={"flex-grow"}>Seconds Remaining</small>
        </div>

        <div className={"d-flex col-sm flex-grow"}>
          <h1>{setsCompleted}/{sets}</h1>
          <small className={"flex-grow"}>Sets Done</small>
        </div>
      </div>

      <div className="card-body d-flex flex-column flex-grow">

        {/* Row for Timer buttons */}
        <small>Timer Controller</small>
        <div className={"d-flex flex-row"}>
          <button className={"btn btn-primary btn-sm"} onClick={startTimer}>Start</button>
          <div className="mx-1"/>
          <button className={"btn btn-primary btn-sm"} onClick={stopTimer}>Stop</button>
        </div>

      {/* Row for Resetting*/}
      <small>Reset</small>
      <div className={"d-flex flex-row"}>
        <button className={"btn btn-secondary btn-sm"} onClick={resetTimer}>Reset Timer</button>
        <div className="mx-1"/>
        <button className={"btn btn-secondary btn-sm"} onClick={resetSets}>Reset Sets</button>
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
  )

}


export default CountdownTimerWithSets;