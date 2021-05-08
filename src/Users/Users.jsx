import React from "react";
import "./Users.scss";
import { PropContext } from "../App";
import { useContext } from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Typography, Box } from "@material-ui/core";

function Users() {
  const { data, loggedIn } = useContext(PropContext);
  return (
    <>
      {data.map((e) => (
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={{
            pathname: `/user/${e.id}`,
          }}
          key={uuid()}
        >
          <Box
            style={{
              margin: "2px auto",
              padding: "5px",
              width: "90%",
            }}
            border={1}
            borderColor="secondary.main"
          >
            <Box>
              <Typography variant="p">Id: {e.id} </Typography>
            </Box>
            <Box>
              <Typography variant="p">Name: {e.name} </Typography>
            </Box>
            <Box>
              <Typography variant="p">Email: {e.email} </Typography>
            </Box>
            <Box>
              <Typography variant="p">City: {e.address.city} </Typography>
            </Box>
          </Box>
        </Link>
      ))}
    </>
  );
}

export default Users;
