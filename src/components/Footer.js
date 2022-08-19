import React from 'react';
import {Link} from "react-router-dom";
import {ROUTES} from "../constants";


const Footer = ({authenticated}) => {

  // We will only display the footer if the current user is not authenticated.
  // Otherwise, we will just hide it as it is a hindrance to our main app view.
  if (!authenticated) {
    return (
      <footer className="footer fixed-bottom bg-light d-flex py-2">
        <div className="row d-flex flex-grow">
          <div className={"col-sm d-flex flex-row justify-content-center"}>
            <Link to={ROUTES.INDEX} className="navbar-brand footer-item">Home</Link>
          </div>

          <div className={"col-sm d-flex flex-row justify-content-center"}>
            <Link to={ROUTES.ABOUT} className="navbar-brand footer-item">About</Link>
          </div>

          <div className={"col-sm d-flex flex-row justify-content-center"}>
            <Link to={ROUTES.CONTACT} className="navbar-brand footer-item">Contact</Link>
          </div>
        </div>
      </footer>
    )
  } else {
    return null;
  }

}

export default Footer;