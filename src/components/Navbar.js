import React from 'react';
import {getAuth} from "firebase/auth";
import {Link} from "react-router-dom";
import {APP_VALUES, ROUTES} from "../constants";
import {useNavigate} from "react-router-dom";


const Navbar = ({authenticated}) => {

  const navigate = useNavigate();
  const auth = getAuth();

  const signOut = () => {
    auth.signOut().then(() => {
      navigate(ROUTES.LOGIN);
    });
    // Upon a successful logout, we will send the user back to the login screen
  }

  return (
    <nav className="navbar py-1 d-flex">
      <div className="container d-flex flex-row align-items-center justify-content-between my-auto">

        <Link to={ROUTES.INDEX} className="navbar-brand">
          <img aria-label={`${APP_VALUES.APP_NAME} Logo`} src={process.env.PUBLIC_URL + "/img/MainLogo.png"} id={"navbar-brand-logo"} alt={'Main Logo'}/>
        </Link>

        <div className={"d-flex flex-row align-items-center justify-self-end"}>
          {
            authenticated ?
              <button type={"button"} className={"nav-link btn btn-link no-text-decoration inherit-text-color"} onClick={signOut}>Log Out</button>
              :
              <>
                <Link to={ROUTES.LOGIN} className="nav-link">
                  <button type={"button"} className={"btn btn-link no-text-decoration inherit-text-color"}>Log In</button>
                </Link>
                <Link to={ROUTES.SIGNUP} className="nav-link">
                  <button type={"button"} className={"btn btn-link no-text-decoration inherit-text-color"}>Sign Up</button>
                </Link>
              </>
          }

        </div>

      </div>
    </nav>
  )
}

export default Navbar;