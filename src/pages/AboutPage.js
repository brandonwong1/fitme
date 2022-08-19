import React from 'react';
import PageTemplate from "../templates/PageTemplate";
import {APP_VALUES} from "../constants";
import {Link} from "react-router-dom";
import Lottie from "lottie-react";
import ThankYouAnimation from "../lottie/thank-you-animation.json";


const AboutPage = () => {
  return (
    <PageTemplate>
      <h1>About</h1>
      <p>{APP_VALUES.APP_NAME} is a new, simple web app built using React and Firebase to allow users to create their own workouts from our ever-expanding catalog of exercises.</p>
      <p>All images are our own.</p>
      <p>We integrated <Link className={"link"} to={{pathname: "https://lottiefiles.com"}} target={"_blank"}>Lottie Files</Link> for our additional React Package. We used some free-to-use Lottie animations. They are listed below:</p>
      <ul>
        <li><Link className={"link"} to={{pathname: "https://lottiefiles.com/75821-wide-arm-push-up"}} target={"_blank"}>man-pushup.json</Link></li>
        <li><Link className={"link"} to={{pathname: "https://lottiefiles.com/90054-squat-reach"}} target={"_blank"}>man-squat.json</Link></li>
        <li><Link className={"link"} to={{pathname: "https://lottiefiles.com/29951-healthy-lifestyle-exercise"}} target={"_blank"}>woman-crunches.json</Link></li>
        <li><Link className={"link"} to={{pathname: "https://lottiefiles.com/95396-workout-girl"}} target={"_blank"}>woman-leg-pushout.json</Link></li>
        <li><Link className={"link"} to={{pathname: "https://lottiefiles.com/81972-cobras"}} target={"_blank"}>woman-cobra.json</Link></li>
        <li><Link className={"link"} to={{pathname: "https://lottiefiles.com/82521-thank-you"}} target={"_blank"}>thank-you-animation.json</Link> (found below 🤗)</li>
      </ul>
      <div className={"d-flex justify-content-center w-full flex-column align-items-center mw-50"}>
        <Lottie animationData={ThankYouAnimation} loop={true} autoplay={true} />
      </div>
    </PageTemplate>
  )
}

export default AboutPage;