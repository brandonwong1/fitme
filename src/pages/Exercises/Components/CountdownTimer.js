import React from "react";

// Make a countdown timer that is a React component styled with Bootstrap
// This component will be used in the WorkoutPage component
// The timer will be used to keep track of elapsed time during a workout and notify the user when the workout is complete.
// It takes in the number of seconds as a prop and counts down from that number.
// Users can start, stop, and reset the timer.

const CountdownTimer = ({seconds}) => {
  const [countdown, setCountdown] = React.useState(seconds);
  const [timerOn, setTimerOn] = React.useState(false);

  React.useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        // If the countdown reaches 0, then stop the timer
        if (countdown === 0) {
          setTimerOn(false);
        }
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    } else if (!timerOn && countdown !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn, countdown]);

  const startTimer = () => {
    setTimerOn(true);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  const resetTimer = () => {
    setCountdown(seconds);
    setTimerOn(false);
  };

  return (
    <div className="mx-auto card d-flex flex-shrink justify-content-center align-items-center countdown-timer p-2">
      <div className="card-title text-center">
        <small>Seconds Remaining</small>
        <h1>{countdown}</h1>
      </div>
      <div className="card-body d-flex">
        <button className={"btn btn-secondary btn-sm"} onClick={startTimer}>Start</button>
        <div className="mx-1"/>
        <button className={"btn btn-secondary btn-sm"} onClick={stopTimer}>Stop</button>
        <div className="mx-1"/>
        <button className={"btn btn-secondary btn-sm"} onClick={resetTimer}>Reset</button>
      </div>

    </div>
  );
};

export default CountdownTimer;