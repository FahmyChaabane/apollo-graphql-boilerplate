import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Post from "./components/Post";
import Logout from "./components/Logout";
import Home from "./components/Home";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
        <Route path="/Post/:id" component={Post} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/home" component={Home} />
        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}
export default App;
