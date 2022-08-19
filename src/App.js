import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {getAuth} from "firebase/auth";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/Home/HomePage";
import CreateWorkoutPage from "./pages/Exercises/CreateWorkoutPage";
import ExercisePage from "./pages/Exercises/ExercisePage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/Authentication/LoginPage";
import SignUpPage from "./pages/Authentication/SignUpPage";
import IndexPage from "./pages/IndexPage";
import WorkoutPage from "./pages/Exercises/WorkoutPage";
import AboutPage from "./pages/AboutPage";

// Global Style - Custom Theme
import './style/theme.css';

import {ROUTES} from "./constants";

function App() {

  const auth = getAuth();

  const [authenticated, setAuthenticated] = React.useState(false);  // Used as a boolean state to determine which routes will be "protected".

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
    return () => {
      unsubscribe();
    }
  }, [auth]);

  return (
    <div className="App">
      <Navbar authenticated={authenticated}/>
        <Routes>
          <Route path={ROUTES.INDEX} element={authenticated ? <IndexPage/> : <HomePage />} />  {/* If the user is already authenticated, then we will bypass the homepage */}
          <Route path={ROUTES.EXERCISE} element={<ExercisePage />} />
          <Route path={ROUTES.CREATE_WORKOUT} element={authenticated ? <CreateWorkoutPage /> : <SignUpPage />} />
          <Route path={ROUTES.WORKOUT} element={authenticated ? <WorkoutPage /> : <SignUpPage />} />
          <Route path={ROUTES.LOGIN} element={authenticated ? <IndexPage /> : <LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={authenticated ? <IndexPage /> : <SignUpPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.CATCH_ALL} element={authenticated ? <IndexPage /> : <NotFoundPage />} /> {/* If the user is not authenticated, then we will redirect to the Index Page (authenticated). This means that 404 functionality will only exist for unauthenticated users. */}
        </Routes>
      <Footer authenticated={authenticated} />
    </div>
  );
}

export default App;
