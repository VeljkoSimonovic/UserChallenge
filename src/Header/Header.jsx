import React, { useContext } from "react";
import "./Header.scss";
import { PropContext } from "../App";
import { Link } from "react-router-dom";

function Header() {
  const { loggedIn, setLoggedIn } = useContext(PropContext);
  return (
    <header>
      <h1>UserChallenge</h1>
      {loggedIn ? (
        <button
          onClick={() => {
            setLoggedIn(false);
            localStorage.removeItem("logged");
          }}
        >
          Log out
        </button>
      ) : null}
      <Link to="/users">
        <button>Users</button>
      </Link>
      <button>Change Theme</button>
    </header>
  );
}

export default Header;
