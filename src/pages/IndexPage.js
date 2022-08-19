import React from 'react';
import PageTemplate from "../templates/PageTemplate";
import MyWorkoutsComponent from "./Exercises/Components/MyWorkoutsComponent";
import WelcomeUserComponent from "./Exercises/Components/WelcomeUserComponent";

const IndexPage = () => {
  return (
    <PageTemplate>
      <WelcomeUserComponent />
      <div className={"h-2-spacer"} />
      <MyWorkoutsComponent />
      <div className={"h-2-spacer"} />
    </PageTemplate>
  )
}

export default IndexPage;