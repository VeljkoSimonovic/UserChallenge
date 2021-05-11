import React from "react";
import { PropContext } from "../../App";
import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Typography, Button, Box } from "@material-ui/core";
import {
  emailIsValid,
  phoneIsValid,
  idIsValid,
  zipIsValid,
  latIsValid,
  lngIsValid,
} from "../../Utils/validation";

function EditOrCreateUser(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [id, setId] = useState("");
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [geoLat, setGeoLat] = useState("");
  const [geoLng, setGeoLng] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [bs, setBs] = useState("");

  const [redirect, setRedirect] = useState(false);
  const { data } = useContext(PropContext);
  const user = data.find((e) => props.match.params.id == e.id);
  console.log(latIsValid(geoLat), lngIsValid(geoLng));
  const editUser = () => {
    if (
      emailIsValid(email) &&
      phoneIsValid(phone) &&
      idIsValid(id, data) &&
      zipIsValid(zipCode) &&
      latIsValid(geoLat) &&
      lngIsValid(geoLng) &&
      name &&
      userName &&
      street &&
      suite &&
      city &&
      website &&
      companyName &&
      catchPhrase &&
      bs
    ) {
      fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          name: name,
          username: userName,
          email: email,
          address: {
            street: street,
            suite: suite,
            city: city,
            zipcode: zipCode,
            geo: {
              lat: geoLat,
              lng: geoLng,
            },
          },
          phone: phone,
          website: website,
          company: {
            name: companyName,
            catchPhrase: catchPhrase,
            bs: bs,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.ok) setRedirect(true);
        else alert(`request failed ${response.status}`);
      });
    } else
      alert(
        "Id must be unique, all fields are required, or incorrect field format"
      );
  };
  const createUser = () => {
    if (
      emailIsValid(email) &&
      phoneIsValid(phone) &&
      idIsValid(id, data) &&
      zipIsValid(zipCode) &&
      latIsValid(geoLat) &&
      lngIsValid(geoLng) &&
      name &&
      userName &&
      street &&
      suite &&
      city &&
      website &&
      companyName &&
      catchPhrase &&
      bs
    ) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          name: name,
          username: userName,
          email: email,
          address: {
            street: street,
            suite: suite,
            city: city,
            zipcode: zipCode,
            geo: {
              lat: geoLat,
              lng: geoLng,
            },
          },
          phone: phone,
          website: website,
          company: {
            name: companyName,
            catchPhrase: catchPhrase,
            bs: bs,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.ok) setRedirect(true);
        else alert(`request failed ${response.status}`);
      });
    } else
      alert(
        "Id must be unique, all fields are required, or incorrect field format"
      );
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
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Id</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={id}
          onChange={(e) => setId(e.target.value)}
          type="number"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Street</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          type="text"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Suite</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={suite}
          onChange={(e) => setSuite(e.target.value)}
          type="text"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">City</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Zip Code</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          type="number"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Geo Lattitude</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={geoLat}
          onChange={(e) => setGeoLat(e.target.value)}
          type="number"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Geo Longitude</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={geoLng}
          onChange={(e) => setGeoLng(e.target.value)}
          type="number"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Website</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          type="text"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Company name</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          type="text"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Company catchphrase</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={catchPhrase}
          onChange={(e) => setCatchPhrase(e.target.value)}
          type="text"
          required
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">Business slogan</Typography>
        <TextField
          style={{ margin: "2px" }}
          variant="outlined"
          color="secondary"
          value={bs}
          onChange={(e) => setBs(e.target.value)}
          type="text"
          required
        />
      </Box>

      {props.match.params.id ? (
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
