import React from "react";
import { PropContext } from "../../App";
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Typography, Button, Box } from "@material-ui/core";

function EditOrCreateUser(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { data, editOrCreate } = useContext(PropContext);
  const user = data.find((e) => props.match.params.id == e.id);
  const emailIsValid = () =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  const phoneIsValid = () =>
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone);
  console.log(user);
  const editUser = () => {
    if (emailIsValid() && phoneIsValid() && name && userName) {
      fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          username: userName,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.ok) setRedirect(true);
        else alert(`request failed ${response.status}`);
      });
    } else alert("All fields are required, or email/phone format incorrect");
  };

  const createUser = () => {
    if (emailIsValid() && phoneIsValid() && name && userName) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          username: userName,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.ok) setRedirect(true);
        else alert(`request failed ${response.status}`);
      });
    } else alert("All fields are required, or email/phone format incorrect");
  };

  return redirect ? (
    <Redirect to="/users" />
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ marginTop: "10px" }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Name</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Email</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Phone</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">User name</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          required
        />
      </Box>

      {editOrCreate ? (
        <Button
          style={{ margin: "2px" }}
          variant="contained"
          color="secondary"
          onClick={() => editUser()}
        >
          Edit
        </Button>
      ) : (
        <Button
          style={{ margin: "2px" }}
          variant="contained"
          color="secondary"
          onClick={() => createUser()}
        >
          Create
        </Button>
      )}
    </Box>
  );
}

export default EditOrCreateUser;