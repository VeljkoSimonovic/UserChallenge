import React from "react";
import "./CreateUser.scss";
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [created, setCreated] = useState(false);
  const emailIsValid = () =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const createUser = () => {
    if (emailIsValid() && name) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.ok) setCreated(true);
        else alert(`request failed ${response.status}`);
      });
    } else alert("Name required or invalid email");
  };

  return created ? (
    <Redirect to="/users" />
  ) : (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        id="email1"
        required
      />
      <button onClick={() => createUser()}>Submit</button>
    </div>
  );
}

export default CreateUser;
