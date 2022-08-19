import React from 'react';
import {getAuth} from "firebase/auth";
import {getDatabase, ref, child, get} from "firebase/database";

// This component is used to show the user all of their workouts.

const WelcomeUserComponent = () => {

  const [firstName, setFirstName] = React.useState('');

  const auth = getAuth();
  const db = getDatabase();
  const usersDBRef = ref(db, 'users/');
  const userDBRef = child(usersDBRef, auth.currentUser.uid);

  React.useEffect(() => {
    // Get the user's first name from the database
    get(userDBRef).then((snapshot) => {
      if (snapshot.exists()) {
        setFirstName(snapshot.val().firstName);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [userDBRef]);

  return (
    <div className={"d-flex justify-content-center align-items-center"}>
      <h1>Welcome {firstName}!</h1>
    </div>
  )

}

export default WelcomeUserComponent;