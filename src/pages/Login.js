import React from "react";
import "./styles/login.css";
import useFormValidation from "../components/useFormValidation";
import validateAuth from "../components/validateAuth";

import firebase from '../components/firebase';

const INITIAL_STATE = {
  email: "",
  password: ""
};

function Login() {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateAuth, authenticateUser);

  const [firebaseError, setFirebaseError] = React.useState(null);

  async function authenticateUser() {
    const { email, password } = values;

    try {
      await firebase.login(email, password);
    } catch(err) {
      setFirebaseError(err.message);
    }
  }

  return (
    <div className="containerlogin">
      <h1 className="login">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          value={values.email}
          className='login {errors.email && "error-input"}'
          autoComplete="off"
          placeholder="Your email address"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className='login {errors.password && "error-input"}'
          name="password"
          type="password"
          placeholder="Choose a safe password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div>
          <button className="login" disabled={isSubmitting} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
