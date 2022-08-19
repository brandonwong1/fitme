import React from 'react';
import PageTemplate from "../../templates/PageTemplate";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {ROUTES} from "../../constants";
import {useNavigate} from "react-router-dom";
import {getDatabase, ref, child, set as firebaseSet} from 'firebase/database';

const SignUpPage = () => {

  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  const usersDBRef = ref(db, 'users/');

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const signUpWithEmailAndPassword = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          // Write user data to the database
          const userId = user.user.uid;
          const newUserRef = child(usersDBRef, userId);
          firebaseSet(newUserRef, {
            firstName,
            lastName,
            email,
          }).then(() => {
            // Redirect to the authenticated index page
            alert("Account created successfully");
            navigate(ROUTES.INDEX);
          }).catch((error) => {
            // Display an alert error message
            alert(error.message);
          });

        }).catch(error => {
        alert(error.message);
      }).finally(() => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      });
    }
  }

  return (
    <PageTemplate>
      <div className={"container w-full h-full d-flex justify-content-center align-items-center"}>
        <div className={"d-flex flex-column justify-content-center mt-5 mb-auto align-items-center"}>
          <form className={"d-flex flex-column flex-grow w-100"} onSubmit={(event) => signUpWithEmailAndPassword(event)}>
            <h1 className={"title my-2"}>Sign Up now 💪🏼</h1>
            <div className={"row"}>
              <div className="col-sm form-group">
                <label htmlFor="first-name">First Name</label>
                <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} className="form-control" name={"first-name"} id="first-name" placeholder="First" required={true} />
              </div>
              <div className="col-sm form-group">
                <label htmlFor="full-name">Last Name</label>
                <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} className="form-control" name={'full-name'} id="full-name" placeholder="Last" required={true} />
              </div>
            </div>

            <div className="form-group mt-2">
              <label htmlFor="email">Email</label>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="form-control" name={'email'} id="email" placeholder="Email Address" required={true} />
            </div>

            <div className={"row mt-2"}>
              <div className="col-sm form-group">
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="form-control" name={"password"} minLength={8} maxLength={16} id="password" placeholder="********" required={true} />
              </div>
              <div className="col-sm form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="form-control" name={'confirm-password'} minLength={8} maxLength={16} id="confirm-password" placeholder="********" required={true} />
              </div>
            </div>
            <small>Your password must be between 8 and 16 characters, inclusive.</small>

            <button type="submit" className="btn btn-primary mt-2 background-main-purple">Submit</button>
            <small>* All fields are required to sign up</small>
          </form>
        </div>
      </div>
    </PageTemplate>
  )
}

export default SignUpPage;