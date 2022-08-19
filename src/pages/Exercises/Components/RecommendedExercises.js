import React from "react";
import '../workoutStyling.css';
import ExerciseMenuBar from "./ExerciseMenuBar";
import ExerciseCard from "./ExerciseCard";
import {EXERCISE_DATA} from "../DATA";


const RecommendedExercises = () => {

    // props
    // - cards

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

    // Based on the number of cards, we will render bootstrap grid
    return (
        <>
            <ExerciseMenuBar selectedTag={selectedTag} selectTag={selectTag} />
            <main>
                <div className={"container"}>
                    <div className={"row"}>
                        {
                            cards.length > 0 &&
                            cards.map((card, index) => {
                                return (<ExerciseCard key={index} cardIndex={(index + 1).toString()} cardImageAlt={card.cardImageAlt} cardImageAria={card.cardImageAria} cardImageSource={card.cardImageSource} exerciseName={card.exerciseName} setsAndReps={card.setsAndReps} selectTag={selectTag} tags={card.tags} />)
                            })
                        }
                    </div>
                </div>
            </main>
        </>
    )

}

export default RecommendedExercises;
