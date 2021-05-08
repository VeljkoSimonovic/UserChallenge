import React from "react";
import "./Login.scss";
import { Redirect } from "react-router-dom";
import { PropContext } from "../App";
import { useState, useEffect, useContext } from "react";
function Login() {
  const [savedEmail, setSavedEmail] = useState(localStorage.getItem("email"));
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const { setLoggedIn } = useContext(PropContext);

  const handleClick = () => {
    if (!localStorage.getItem("email")) {
      setSavedEmail(email);
      localStorage.setItem("email", email);
      setLoggedIn(true);
      localStorage.setItem("logged", true);
    } else if (localStorage.getItem("email") === email) {
      setLoggedIn(true);
      localStorage.setItem("logged", true);
    }
  };

  const emailIsValid = () =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  useEffect(() => {
    emailIsValid(email) ? setValidEmail(true) : setValidEmail(false);
  }, [email]);
  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        id="email"
        required
      />
      <button disabled={!validEmail} onClick={() => handleClick()}>
        Log in
      </button>
    </div>
  );
}

export default Login;
