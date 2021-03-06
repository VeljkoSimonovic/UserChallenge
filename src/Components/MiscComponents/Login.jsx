import React from "react";
import { PropContext } from "../../App";
import { useState, useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography, Button, Box } from "@material-ui/core";
import { emailIsValid } from "../../Utils/validation";
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

  useEffect(() => {
    emailIsValid(email) ? setValidEmail(true) : setValidEmail(false);
  }, [email]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ margin: "20px" }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Email</Typography>
        <TextField
          variant="outlined"
          color="secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <Button
          disabled={!validEmail}
          onClick={() => handleClick()}
          variant="contained"
          color="secondary"
          style={{ margin: "20px" }}
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
