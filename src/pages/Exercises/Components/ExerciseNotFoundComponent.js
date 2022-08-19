import React from "react";
import {Link} from "react-router-dom";
import PageTemplate from "../../../templates/PageTemplate";
import {APP_VALUES} from "../../../constants";

const ExerciseNotFoundComponent = () => {

  return (
    <PageTemplate>
      <div className={"container w-full h-full d-flex justify-content-center align-items-center"}>
        <div className={"d-flex flex-column"}>
          <Link to={"/"} className={"mb-4 d-flex flex-column justify-content-center align-items-center link flex-shrink"}>
            <img aria-label={`${APP_VALUES.APP_NAME} Logo`} src={process.env.PUBLIC_URL + "/img/MainLogo.png"} className={"icon-logo mb-2"} alt={'Main Logo'}/>
            <h3>{APP_VALUES.APP_NAME}</h3>
          </Link>

          <h1 className={"title"}>Whoops - Exercise not found 🤦🏻‍♂️</h1>
          <h3 className={"text-subtext"}>We're sorry, you've tried to access an exercise that does not yet exist.</h3>
          <p>Since this exercise does not yet exist, please suggest a new one.</p>
          <form className={"d-flex flex-column flex-grow w-100"} action="https://formspree.io/f/mqkjkwwr" method="POST">
            <div className={"row mt-2"}>
              <div className="col-sm form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" name={"email"} id="email" aria-describedby="emailHelp" placeholder="joe@acme.com" required={true} />
                  <small id="emailHelp" className="form-text text-muted">We'll reach out to you later via this email address.</small>
              </div>
              <div className="col-sm form-group">
                <label htmlFor="full-name">Full Name</label>
                <input type="text" className="form-control" name={'full-name'} id="full-name" placeholder="Joe Davis" required={true} />
              </div>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="exercise">Exercise</label>
              <input type="text" className="form-control" name={'exercise'} id="exercise" placeholder="Hack Squat" required={true} />
            </div>
            <div className="form-group mt-2">
              <label className="form-check-label" htmlFor="message">Message</label>
              <textarea className="form-control" name={'message'} id="message" rows="3" placeholder="I would like to suggest this exercise because..." required={true}></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-2 background-main-purple">Submit</button>
          </form>
        </div>
      </div>
    </PageTemplate>
  )
}

export default ExerciseNotFoundComponent;