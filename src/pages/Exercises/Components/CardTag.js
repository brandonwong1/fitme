import React from "react";
import '../workoutStyling.css';


const CardTag = (props) => {

    // props
    // - selectTag - onClick handler for sorting the cards by tag
    // - tagName - the name of the tag to be displayed

    return (
        <span key={props.tagName} onClick={() => props.selectTag()} className="badge rounded-pill bg-light text-dark same card-tag">{props.tagName}</span>
    )
}

export default CardTag;
