import React, { useContext } from "react";
import "./Header.scss";
import { PropContext } from "../App";
import { Link } from "react-router-dom";
import { AppBar, Button, Typography, Box } from "@material-ui/core";

function Header() {
  const { loggedIn, setLoggedIn, handleThemeChange } = useContext(PropContext);
  return (
    <AppBar style={{ position: "relative" }}>
      <Box
        display="flex"
        flexDirection="row-reverse"
        alignItems="center"
        padding="10px"
      >
        <Box>
          {loggedIn ? (
            <Button
              style={{ margin: "2px" }}
              variant="contained"
              color="secondary"
              onClick={() => {
                setLoggedIn(false);
                localStorage.removeItem("logged");
              }}
            >
              Log out
            </Button>
          ) : null}
          <Link to="/users" style={{ textDecoration: "none" }}>
            <Button
              style={{ margin: "2px" }}
              variant="contained"
              color="secondary"
            >
              Users
            </Button>
          </Link>
          <Button
            style={{ margin: "2px" }}
            variant="contained"
            color="secondary"
            onClick={() => {
              handleThemeChange();
            }}
          >
            Change Theme
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
}

export default Header;
