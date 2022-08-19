import React from 'react';
import PageTemplate from "../../templates/PageTemplate";
import {getDatabase, ref, push, set, serverTimestamp} from "firebase/database";
import {getAuth} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {EXERCISE_DATA, TAGS} from "./DATA";
import CardTag from "./Components/CardTag";


const CreateWorkoutPage = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const userWorkoutsDBRef = ref(db, 'users/' + auth.currentUser.uid + '/workouts');

  const [title, setTitle] = React.useState('');
  const [selectedExerciseId, setSelectedExerciseId] = React.useState(null);
  const [exercises, setExercises] = React.useState([]);

  const saveWorkout = () => {
    if (title.length < 3) {
      alert('Workout title must be at least 3 characters long');
      return;
    }

    // Generate a firebase realtime database push reference
    const newWorkoutRef = push(userWorkoutsDBRef);  // This way we can get the key to set as an id
    console.log(newWorkoutRef);
    console.log(newWorkoutRef.key);
    const createWorkoutRef = ref(db, 'users/' + auth.currentUser.uid + '/workouts/' + newWorkoutRef.key);
    set(createWorkoutRef, {
      id: newWorkoutRef.key,
      title,
      exercises,
      createdAt: serverTimestamp(),
    }).then(() => {
      alert('Workout created successfully');
      navigate('/workout/' + newWorkoutRef.key);  // Take user to the workout page
    }).catch((error) => {
      alert(error.message);
    });

  }

  const appendToExercises = (exercise) => {
    setExercises([...exercises, exercise]);
    setSelectedExerciseId(null);
  }

  const removeExercise = (index) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  }

  return (
    <PageTemplate>
      <h1>Create Workout</h1>

      <div className={"form-group"}>
        <label htmlFor={"name"}>Name</label>
        <input type={"text"} id={"name"} name={"name"} minLength={2} value={title} onChange={(event) => setTitle(event.target.value)} className={"form-control"} placeholder={"Workout Name"} required={true} />
      </div>
      <small>Click on an exercise card, adjust the number of sets, and the number of reps or time period, and add to your workout.</small>

      <BrowseExercises setSelectedExerciseId={setSelectedExerciseId} />

      {
        selectedExerciseId !== null &&
          <AddExerciseComponent
            exerciseId={selectedExerciseId}
            exerciseName={EXERCISE_DATA.filter((exercise) => exercise.id === selectedExerciseId)[0].name}
            photo={EXERCISE_DATA.filter((exercise) => exercise.id === selectedExerciseId)[0].photo}
            isReps={EXERCISE_DATA.filter((exercise) => exercise.id === selectedExerciseId)[0].isReps}
            setSelectedExerciseId={setSelectedExerciseId}
            setAddExercise={appendToExercises}
          />
      }

      {/* Display the Added Exercises Here */}
      {
        exercises.length > 0 &&
        <div className={"d-flex flex-column w-full"}>
          <h6 className={"text-center text-subtext mb-4"}>Added Exercises</h6>
          {
            exercises.map((exercise, index) => {
              return (
                <AddedExerciseCard
                  key={index}
                  index={index}
                  exerciseId={exercise.exerciseId}
                  sets={exercise.sets}
                  reps={exercise.reps}
                  seconds={exercise.seconds}
                  removeExercise={removeExercise}
                />
              )
            })
          }
        </div>
      }
      <div>
      </div>

      <button disabled={title.length < 3 || exercises.length < 1} onClick={saveWorkout} className={"btn background-main-purple text-white mt-2 mb-4"}>Save</button>
      <div className={"vertical-spacer-2"} />
    </PageTemplate>
  )
}

export default CreateWorkoutPage;

const AddedExerciseCard = ({exerciseId, index, sets=0, reps=0, seconds=0, removeExercise}) => {
  // Need the Name, number of Sets, Reps, Time, id, and photo
  return (
    <div className={"card d-flex w-full py-2"}>
      <div className={"card-body"}>
        <div className={"d-flex flex-row justify-content-between align-items-center"}>
          <div className={"d-flex flex-row align-items-center"}>
            <img src={EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].photo} className="card-image rounded" alt={EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].name} aria-label={EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].name} />
            <div className={"horizontal-spacer-2"} />
          <div className={"d-flex flex-column"}>
            <h4 className={"text-subtext"}>{EXERCISE_DATA.filter((exercise) => exercise.id === exerciseId)[0].name}</h4>
            <small>{sets} sets of {reps > 0 && seconds === 0 ? reps.toString() + ' reps' : seconds.toString() + ' seconds'}</small>
          </div>
          </div>
          <span>
            <button onClick={() => removeExercise(index)} className={"btn btn-sm btn-danger text-white"}>Remove</button>
          </span>
        </div>
      </div>
    </div>
  )
}

// setAddExercise is a callback that appends the exercise to the workout array
// Our data structure is: {id: String, reps: Number | undefined, sets: Number, seconds: Number | undefined}
// isReps determines if this exercise is reps or time based
const AddExerciseComponent = ({exerciseId, exerciseName, photo, isReps=true, setSelectedExerciseId, setAddExercise}) => {

  const [reps, setReps] = React.useState(0);
  const [sets, setSets] = React.useState(0);
  const [time, setTime] = React.useState(0);

  const submitAddExercise = (event) => {
    event.preventDefault();
    if (isReps && reps === 0) {
      alert('Reps must be greater than 0');
      return;
    } else if (!isReps && time === 0) {
      alert('Time must be greater than 0');
      return;
    } else if (sets === 0) {
      alert('Sets must be greater than 0');
      return;
    }
    setSelectedExerciseId(null);
    let payload = {
      reps,
      exerciseId,
      seconds: time,
      sets,
    };
    setAddExercise(payload);
  }

  return (
    <div>
      <form className={"d-flex flex-column my-2"} onSubmit={submitAddExercise}>
        <div className={"d-flex flex-row justify-content-between align-items-center"}>
          <h3>Add {exerciseName} to workout program</h3>
          <p className={"text-red cursor-pointer fw-bold"} onClick={() => setSelectedExerciseId(null)}>Cancel</p>
        </div>
        <div className={"d-flex flex-column my-auto justify-content-center align-items-center my-4 "}>
          <img className={"main-exercise-image"} src={photo} alt={exerciseName} />
        </div>
        <div className={"row"}>
          <div className={"col-sm form-group"}>
            <label htmlFor={"sets"}>Sets</label>
            <input type={"number"} min={0} id={"sets"} name={"sets"} value={sets} onChange={(event) => setSets(Number(event.target.value))} className={"form-control"} placeholder={"Sets"} required={true} />
          </div>
          <div className={"col-sm form-group"}>
            <label htmlFor={"reps"}>{isReps ? 'Reps' : 'Time Duration'}</label>
            <input type={"number"} min={0} id={"reps"} name={"reps"} value={isReps ? reps : time} onChange={(event) => isReps ? setReps(Number(event.target.value)) : setTime(Number(event.target.value))} className={"form-control"} placeholder={isReps ? 'Reps' : 'In seconds'} required={true} />
          </div>
        </div>
        <button type={"submit"} className={"btn btn-sm btn-secondary mt-2"}>Add exercise to Workout</button>
      </form>
    </div>
  )

}


const BrowseExercisesMenuBar = ({selectedTag, selectTag}) => {

  return (
    <div className={"d-flex flex-column py-1 pt-4"}>
      {
        selectedTag === null ?
          <small className={"text-subtext"}>Click a tag to sort exercises.</small> :
          <small className={"text-subtext"}>Sorting by: {Object.values(TAGS).filter(tag => tag.id === selectedTag)[0].tagName}</small>
      }

      <select defaultValue={null} onChange={event => selectTag(event.target.value)} className={"form-select mb-4"} aria-label={"Select an exercise tag"}>
        <option value={selectedTag}>-- Select a Tag --</option>
        {
          Object.values(TAGS).map((tag, index) => {
            return (
              <option value={tag.id} key={index.toString()}>{tag.tagName}</option>
            )
          })
        }
      </select>

    </div>
  )

}

const BrowseExercises = ({setSelectedExerciseId}) => {

  const [cards, setCards] = React.useState(EXERCISE_DATA);
  const [selectedTag, setSelectedTag] = React.useState(null);    // Used for filtering
  const [selected, setSelected] = React.useState(false);

  // Callback function used to select the exercises to filter by
  const selectTag = (tagId) => {
    // When a tag is selected from the exercise card, this callback is called, which will be used to only show cards with this tag id
    if (!selected) {
      setSelected(true);
      setSelectedTag(tagId);
      setCards(EXERCISE_DATA.filter(card => card.tags.find(tag => tag.id === tagId)));
    } else {
      if (selectedTag !== tagId) {
        setSelectedTag(tagId);
        setCards(EXERCISE_DATA.filter(card => card.tags.find(tag => tag.id === tagId)));
      } else {
        setSelected(false);
        setSelectedTag(null);
        setCards(EXERCISE_DATA);
      }

    }

  }

  return (
    <div>
      <BrowseExercisesMenuBar selectedTag={selectedTag} selectTag={selectTag} />

      <div className={"row"}>
        {
          cards.length > 0 &&
          cards.map((card, index) => {
            return (<SelectExerciseCard key={index.toString()} onSelectExercise={setSelectedExerciseId} selectTag={selectTag} exerciseId={card.id} name={card.name} photo={card.photo} isReps={card.isReps} tags={card.tags} />)
          })
        }
      </div>

    </div>
  )
}

const SelectExerciseCard = ({exerciseId, selectTag, tags = [], isReps = false, photo, name, onSelectExercise }) => {

  return (
    <div className="col-12 col-lg-3 d-flex cursor-pointer" onClick={() => onSelectExercise(exerciseId)}>
      <div className="card mb-4 card-container">
        <div className="card-body">
          <div className="row">
            <div className="col-auto col-lg-12">
              <div className="card-image-frame mx-auto">
                <img src={photo} className="card-image rounded" alt={name} aria-label={name} />
              </div>
            </div>
            <div className="col">
              <Link to={'/exercise/' + exerciseId} className={"link"} target={"_blank"}>
                <h2 className="card-text-exercise">{name}</h2>
              </Link>

              <div className="align-self-end">
                <p className="card-text-set-reps">-- sets of {isReps ? '-- reps' : '-- seconds'}</p>
                <Link to={"/exercise/" + exerciseId} className={"link"} target={"_blank"}>
                  <button type="button" className="btn btn-secondary btn-sm">Exercise Information</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">

          {
            tags.length > 0 &&
            tags.map((tag, index) => {
              return (<CardTag key={index} tagName={tag.tagName} selectTag={() => selectTag(tag.id)} />)
            })
          }

        </div>
      </div>
    </div>
  )

}