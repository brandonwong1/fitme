import React from "react";
import '../workoutStyling.css';
import CardTag from "./CardTag";

// This component is for an exercise card.
// We will use it to render and route to a specific exercise

const ExerciseCard = (props) => {

    // props:
    // - cardImageSource
    // - cardImageAlt
    // - cardImageAria
    // - key (used to get the exercise number)
    // - exerciseName
    // - setsAndReps (number of sets and number of reps to do)
    // - selectTag(tagId) - callback for selecting a tag
    // - tags - an array of objects that contains a string tag name, and string tag id (ex: [{tagName: str, id: str}])

    return (
        <div className="col-12 col-lg-3 d-flex">
            <div className="card mb-4 card-container">
                <div className="card-body">
                    <div className="row">
                        <div className="col-auto col-lg-12">
                            <h3 className="routine-step">Exercise #{props.cardIndex}</h3>
                            <div className="card-image-frame">
                                <img src={props.cardImageSource} className="card-image" alt={props.cardImageAlt} aria-label={props.cardImageAria} />
                            </div>
                        </div>
                        <div className="col">
                            <h2 className="card-text-exercise">{props.exerciseName}</h2>
                            <div className="align-self-end">
                                <p className="card-text-set-reps">{props.setsAndReps}</p>
                                <button type="button" className="btn btn-secondary btn-sm">Exercise Information</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-footer">

                    {
                        props.tags.length > 0 &&
                        props.tags.map((tag, index) => {
                            return (<CardTag key={index} tagName={tag.tagName} selectTag={() => props.selectTag(tag.id)} />)
                        })
                    }

                </div>
            </div>
        </div>
    )

}


export default ExerciseCard;
