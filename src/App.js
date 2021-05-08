import "./App.scss";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Users from "./Users/Users";
import User from "./User/User";
import Login from "./Login/Login";
import CreateUser from "./CreateUser/CreateUser";
import EditUser from "./EditUser/EditUser";
export const PropContext = React.createContext();
function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("logged"));
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
      <PropContext.Provider value={{ loggedIn, setLoggedIn, data }}>
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
            render={() =>
              loggedIn ? <CreateUser /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/user/:id/edit"
            render={(routeInfo) =>
              loggedIn ? <EditUser {...routeInfo} /> : <Redirect to="/login" />
            }
          />
        </Switch>
      </PropContext.Provider>
    </>
  );
}

export default App;
