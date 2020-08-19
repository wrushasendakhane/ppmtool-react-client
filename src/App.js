import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom"
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import NavBar from './components/layout/navBar';
import Dashboard from './components/layout/dashboard';
import AddProject from './components/project/addProject';
import UpdateProject from './components/project/updateProject';
import ProjectBoard from './components/project/projectBoard/projectBoard';
import AddProjectTask from './components/project/projectBoard/addProjectTask';
import UpdateProjectTask from './components/project/projectBoard/updateProjectTask';
import Landing from './components/layout/landing';
import Register from './components/userManagement/register';
import Login from './components/userManagement/login';
import { UserContext } from './utilities/userContext';

import { setJWTToken, logout } from "./utilities/security";
import jwt_decode from 'jwt-decode';
import SecureRoute from './utilities/secureRoute';

const jwtToken = localStorage.jwtToken;
var decodedUser = null;
if (jwtToken) {
  setJWTToken(jwtToken);
  decodedUser = jwt_decode(jwtToken);
  const currentTime = Date.now() / 1000;
  if (decodedUser.exp < currentTime) {
    logout();
    window.location.href = "/";
  }
}

function App(props) {
  const [user, setUser] = useState(decodedUser);

  const onLogin = (user) => {
    setUser(user);
  }

  const onLogout = () => {
    logout()
    setUser(null);
  }

  const contextValue = {
    data: user,
    handleLogin: onLogin,
    handleLogout: onLogout
  };



  return (
    <Fragment>
      <UserContext.Provider value={contextValue}>
        <NavBar />
        <main role="main" className="container">
          <Switch>
            <Route path="/register" component={(props) => <Register {...props} />} />
            <Route path="/login" component={(props) => <Login {...props} />} />
            <SecureRoute loggedIn={user != null} path="/dashboard" component={Dashboard} />
            <SecureRoute loggedIn={user != null} path="/addProject" component={(props) => <AddProject {...props} />} />
            <SecureRoute loggedIn={user != null} path="/updateProject/:id" component={(props) => <UpdateProject {...props} />} />
            <SecureRoute loggedIn={user != null} path="/projectBoard/:id" component={(props) => <ProjectBoard {...props} />} />
            <SecureRoute loggedIn={user != null} path="/addProjectTask/:id" component={(props) => <AddProjectTask {...props} />} />
            <SecureRoute loggedIn={user != null} path="/updateProjectTask/:id/:pt_id" component={(props) => <UpdateProjectTask {...props} />} />
            {/* <Route path="/dashboard" component={(props) => <Dashboard {...props} />} />
            <Route path="/addProject" component={(props) => <AddProject {...props} />} />
            <Route path="/updateProject/:id" component={(props) => <UpdateProject {...props} />} />
            <Route path="/projectBoard/:id" component={(props) => <ProjectBoard {...props} />} />
            <Route path="/addProjectTask/:id" component={(props) => <AddProjectTask {...props} />} />
            <Route path="/updateProjectTask/:id/:pt_id" component={(props) => <UpdateProjectTask {...props} />} /> */} */}

            <Route path="/" component={(props) => <Landing {...props} />} />
          </Switch>
        </main>
      </UserContext.Provider>
    </Fragment>
  );
}

export default App;
