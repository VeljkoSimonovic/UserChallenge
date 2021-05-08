import React from "react";
import "./User.scss";
import { PropContext } from "../App";
import { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

function User(props) {
  const [deleted, setDeleted] = useState(false);
  const { data } = useContext(PropContext);
  const user = data.find((e) => props.match.params.id == e.id);

  const deleteUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setDeleted(true);
      } else {
        alert(`Request unsuccessfull ${response.status}`);
      }
    });
  };

  return user ? (
    deleted ? (
      <Redirect to="/users" />
    ) : (
      <div>
        <div>
          <Link to="/createUser">
            <button>Create</button>
          </Link>
          <Link to={{ pathname: `/user/${user.id}/edit` }}>
            <button>Edit</button>
          </Link>

          <button onClick={() => deleteUser()}>Delete</button>
        </div>
        <div>
          <p>Id: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>City: {user.address.city}</p>
          <p>Company: {user.company.name}</p>
        </div>
      </div>
    )
  ) : null;
}

export default User;
