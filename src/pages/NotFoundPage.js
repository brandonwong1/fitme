import React from "react";
import PageTemplate from "../templates/PageTemplate";
import {APP_VALUES} from "../constants";
import {Link} from "react-router-dom";


const NotFoundPage = () => {

    return (
      <PageTemplate>
        <div className={"d-flex flex-column flex-grow justify-content-center align-items-center"}>
          <Link to={"/"} className={"d-flex flex-column justify-content-center align-items-center link flex-shrink"}>
            <img aria-label={`${APP_VALUES.APP_NAME} Logo`} src={process.env.PUBLIC_URL + "/img/MainLogo.png"} className={"icon-logo mb-2"} alt={'Main Logo'}/>
            <h3>{APP_VALUES.APP_NAME}</h3>
          </Link>
          <h1 className={"title"}>404 - Page Not Found</h1>
          <h3 className={"text-subtext"}>We're sorry, this page does not exist!</h3>
        </div>
      </PageTemplate>
    )
}

export default NotFoundPage;