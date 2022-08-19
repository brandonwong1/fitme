import React from "react";
import PageTemplate from "../templates/PageTemplate";
import {APP_VALUES} from "../constants";
import {Link} from "react-router-dom";


const ContactPage = () => {

  return (
    <PageTemplate>
      <div className={"container w-full h-full d-flex justify-content-center align-items-center"}>
        <div className={"d-flex flex-column justify-content-center my-auto align-items-center"}>
          <Link to={"/"} className={"d-flex flex-column justify-content-center align-items-center link flex-shrink"}>
            <img aria-label={`${APP_VALUES.APP_NAME} Logo`} src={process.env.PUBLIC_URL + "/img/MainLogo.png"} className={"icon-logo mb-2"} alt={'Main Logo'}/>
            <h3>{APP_VALUES.APP_NAME}</h3>
          </Link>
          <h1 className={"title"}>Contact</h1>
          <h3 className={"text-subtext"}>We'd love to hear from you!</h3>
          <form className={"d-flex flex-column flex-grow w-100"} action="https://formspree.io/f/xaykyaag" method="POST">
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
              <label htmlFor="subject">Subject</label>
              <input type="text" className="form-control" name={'subject'} id="subject" placeholder="Title" required={true} />
            </div>
            <div className="form-group mt-2">
              <label className="form-check-label" htmlFor="message">Message</label>
              <textarea className="form-control" name={'message'} id="message" rows="3" placeholder="Your message here..." required={true}></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-2 background-main-purple">Submit</button>
          </form>
        </div>
      </div>
    </PageTemplate>
  )
}

export default ContactPage;