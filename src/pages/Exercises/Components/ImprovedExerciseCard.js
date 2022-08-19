import React from "react";
import {Link} from "react-router-dom";
import CardTag from "./CardTag";


const ImprovedExerciseCard = ({onClickCardAction=null, photo, id, name, selectTag=null, tags=[], timerLength=0, numberOfSets=0, numberOfReps=0}) => {

  const runOnClickCardAction = () => {
    if (onClickCardAction) {
      onClickCardAction(id);
    }
  }

  return (
    <div onClick={runOnClickCardAction} className={"col-12 col-lg-3 d-flex"}>
      <div className="card mb-4 w-full">
        <div className="card-body">
          <div className={"card-image-frame"}>
            <img src={photo} className="card-image" alt={name} aria-label={name} />
          </div>
          <Link to={"/exercise/" + id} target={"_blank"}>
            <h2 className={"text-subtext"}>{name}</h2>
          </Link>
          <div className={"align-self-end"}>
            <p className={"text-subtext"}>{numberOfSets === 0 ? '--' : numberOfSets} sets of {timerLength > 0 && numberOfReps === 0 ? timerLength.toString() + ' seconds' : numberOfReps.toString() + ' reps'}</p>
            <Link to={"/exercise/" + id} target={"_blank"}>
              <button type={"button"} className={"btn btn-secondary btn-sm"}>Exercise Information</button>
            </Link>
          </div>

          <div className={"card-footer"}>
            {
            tags.length > 0 &&
            tags.map((tag, index) => {
              return (<CardTag key={index} tagName={tag.tagName} selectTag={() => selectTag(tag.id)} />)
            })
          }
          </div>

        </div>
      </div>
    </div>
  )

}

export default ImprovedExerciseCard;