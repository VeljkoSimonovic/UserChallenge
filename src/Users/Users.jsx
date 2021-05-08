import React from "react";
import "./Users.scss";
import { PropContext } from "../App";
import { useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

function Users() {
  const { data, loggedIn } = useContext(PropContext);
  console.log(loggedIn);
  return (
    <>
      {data.map((e) => (
        <Link
          to={{
            pathname: `/user/${e.id}`,
          }}
          key={uuid()}
        >
          <div>
            <p>Id: {e.id}</p>
            <p>Name: {e.name}</p>
            <p>Email: {e.email}</p>
            <p>City: {e.address.city}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Users;
