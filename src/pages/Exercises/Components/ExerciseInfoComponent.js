import React from 'react';
import PageTemplate from "../../../templates/PageTemplate";
import CardTag from "./CardTag";
import {useNavigate} from "react-router-dom";


const ExerciseInfoComponent = (props) => {

  const navigate = useNavigate();

  return (
    <PageTemplate>
      <p><span className={"back-carrot-navigator"} onClick={() => navigate(-1)}>{'< BACK'}</span>   Exercise</p>
      <h1 className={'title'}>{props.exercise.name}</h1>
      <img src={props.exercise.photo} aria-label={props.exercise.name} alt={props.exercise.name} className={'main-exercise-image my-5'}/>
      <div className={'d-flex flex-row flex-shrink card-footer mr-auto'}>
        <small>Tags: </small>
        {
          props.exercise.tags.map((tag, index) => {
            return (<CardTag key={index} tagName={tag.tagName} selectTag={() => {}}/>)
          })
        }
      </div>

      <p className={'text-subtext'}>{props.exercise.description}</p>
    </PageTemplate>
  )
}

export default ExerciseInfoComponent;