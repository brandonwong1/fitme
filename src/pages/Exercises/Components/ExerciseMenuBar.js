import React from "react";
import '../workoutStyling.css';
import {TAGS} from "../DATA";


const ExerciseMenuBar = ({selectedTag, selectTag}) => {

    // props
    // - select

    return (
        <header className="container-fluid bg-dark text-white py-5">
            <div className="container d-flex flex-column">
                <h1>Recommended Exercises</h1>
                <p className="lead">Based on Quiz Results</p>

                {
                    selectedTag === null ?
                        <p className={"lead"}>Click a tag to sort exercises.</p> :
                        <p className={"lead"}>Sorting by: {Object.values(TAGS).filter(tag => tag.id === selectedTag)[0].tagName}</p>
                }

                <select defaultValue={null} onChange={event => selectTag(event.target.value)} className={"form-select"} aria-label={"Select an exercise tag"}>
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
        </header>
    )

}

export default ExerciseMenuBar;
