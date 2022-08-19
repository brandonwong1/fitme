import React from 'react';
import PageTemplate from "../../templates/PageTemplate";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants";

const LoginPage = () => {

  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Redirect to the authenticated index page
        navigate(ROUTES.INDEX);
      }).catch(error => {
      alert(error.message);
    }).finally(() => {
      setEmail('');
      setPassword('');
    });
  }

  return (
    <PageTemplate>
      <div className={"container w-full h-full d-flex justify-content-center align-items-center"}>
        <div className={"d-flex flex-column justify-content-center mt-5 mb-auto align-items-center"}>

          <form className={"d-flex flex-column flex-grow w-100"} onSubmit={(event) => signIn(event)}>
            <h1 className={"title my-2"}>Log In 👋🏽</h1>
            <div className="form-group mt-2">
              <label htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="form-control" name={'email'} id="email" placeholder="Email Address" required={true} />
            </div>

            <div className={"form-group mt-2"}>
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="form-control" name={"password"} minLength={8} maxLength={16} id="password" placeholder="********" required={true} />
            </div>
            <button type="submit" className="btn btn-primary mt-2 background-main-purple">Submit</button>
          </form>
        </div>
      </div>
    </PageTemplate>
  )
}

export default LoginPage;