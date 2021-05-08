import React from "react";
import { PropContext } from "../App";
import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Typography, Box } from "@material-ui/core";

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
      <Box>
        <Box
          style={{ margin: "10px auto", width: "100%" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Link to="/createUser" style={{ textDecoration: "none" }}>
            <Button
              style={{ margin: "2px" }}
              variant="contained"
              color="secondary"
            >
              Create
            </Button>
          </Link>
          <Link
            to={{ pathname: `/user/${user.id}/edit` }}
            style={{ textDecoration: "none" }}
          >
            <Button
              style={{ margin: "2px" }}
              variant="contained"
              color="secondary"
            >
              Edit
            </Button>
          </Link>
          <Button
            style={{ margin: "2px" }}
            variant="contained"
            color="secondary"
            onClick={() => deleteUser()}
          >
            Delete
          </Button>
        </Box>
        <Box
          style={{ margin: "20px auto" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          border={1}
          borderColor="secondary.main"
        >
          <Typography variant="h6">Id: {user.id}</Typography>
          <Typography variant="h6">Name: {user.name} </Typography>
          <Typography variant="h6">Email: {user.email} </Typography>
          <Typography variant="h6">Phone: {user.phone} </Typography>
          <Typography variant="h6">Website: {user.website} </Typography>
          <Typography variant="h6">City: {user.address.city} </Typography>
          <Typography variant="h6">Company: {user.company.name} </Typography>
        </Box>
      </Box>
    )
  ) : null;
}

export default User;
