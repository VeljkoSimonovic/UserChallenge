import React from "react";
import "./EditUser.scss";
import { PropContext } from "../App";
import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

function EditUser(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [edited, setEdited] = useState(false);
  const { data } = useContext(PropContext);
  const user = data.find((e) => props.match.params.id == e.id);
  const emailIsValid = () =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const editUser = () => {
    if (emailIsValid() && name) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          email: email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.ok) setEdited(true);
        else alert(`request failed ${response.status}`);
      });
    } else alert("Name required or invalid email");
  };

  return edited ? (
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
      <button onClick={() => editUser()}>Submit</button>
    </div>
  );
}

export default EditUser;
