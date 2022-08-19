import React from "react";
import PageTemplate from "../../templates/PageTemplate";
import Lottie from "lottie-react";
import LungingManAnimation from "../../lottie/man-squat.json";
import PushUpManAnimation from "../../lottie/man-pushup.json";
import CobraWoman from "../../lottie/woman-cobra.json";
import PushOutLegWoman from "../../lottie/woman-leg-pushout.json";
import CrunchingWomanAnimation from "../../lottie/woman-crunches.json"
import {APP_VALUES} from "../../constants";

// We want to display random animation from this array;
const lottieAnimations = [
  LungingManAnimation,
  PushUpManAnimation,
  PushOutLegWoman,
  CobraWoman,
  CrunchingWomanAnimation
];

const getRandomAnimation = () => {
  return lottieAnimations[Math.floor(Math.random() * lottieAnimations.length)];
}

const HomePage = () => {
  return (
    <PageTemplate>
      <div className={"d-flex my-auto  flex-column justify-content-center align-items-center"}>
        <div className={"d-flex justify-content-center flex-column align-items-center mw-50"}>
          <h1>Welcome to {APP_VALUES.APP_NAME}!</h1>
          <Lottie animationData={getRandomAnimation()} loop={true} autoplay={true} />
        </div>
      </div>

    </PageTemplate>
  )
}

export default HomePage;