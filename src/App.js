import "./App.scss";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Components/MiscComponents/Header";
import Users from "./Components/UsersDisplay/Users";
import User from "./Components/UsersDisplay/User";
import Login from "./Components/MiscComponents/Login";
import EditOrCreateUser from "./Components/CreateEditUser/EditOrCreateUser";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  orange,
  lightBlue,
  deepOrange,
  deepPurple,
} from "@material-ui/core/colors";
export const PropContext = React.createContext();
function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("logged"));
  const [editOrCreate, setEditOrCreate] = useState(true);
  const [data, setData] = useState([
    {
      id: "",
      name: "",
      email: "",
      phone: "",
      website: "",
      address: { city: "" },
      company: { name: "" },
    },
  ]);

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://jsonplaceholder.typicode.com/users");
      response = await response.json();
      setData(response);
    };
    fetchData();
  }, []);
  return (
    <>
      <PropContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          data,
          handleThemeChange,
          editOrCreate,
          setEditOrCreate,
        }}
      >
        <ThemeProvider theme={darkTheme}>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return loggedIn ? (
                  <Redirect to="/users" />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            ></Route>
            <Route
              exact
              path="/login"
              render={() => (loggedIn ? <Redirect to="/users" /> : <Login />)}
            />
            <Route
              exact
              path="/users"
              render={() => (loggedIn ? <Users /> : <Redirect to="/login" />)}
            />
            <Route
              exact
              path="/user/:id"
              render={(routeInfo) =>
                loggedIn ? <User {...routeInfo} /> : <Redirect to="/login" />
              }
            />
            <Route
              exact
              path="/createUser"
              render={(routeInfo) =>
                loggedIn ? (
                  <EditOrCreateUser {...routeInfo} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/user/:id/edit"
              render={(routeInfo) =>
                loggedIn ? (
                  <EditOrCreateUser {...routeInfo} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </ThemeProvider>
      </PropContext.Provider>
    </>
  );
}

export default App;
