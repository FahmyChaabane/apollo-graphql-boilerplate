import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Post from "./components/Post";
import Home from "./components/Home";
import { Redirect, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Link to="/login">login</Link>
      <Link to="/register">register</Link>
      <Header />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/Post/:id" component={Post} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}
export default App;
