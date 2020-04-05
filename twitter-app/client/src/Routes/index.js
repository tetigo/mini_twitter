import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import AuthRoute from "../Routes/AuthRoute";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <AuthRoute path="/home" component={Home}></AuthRoute>
      </Switch>
    </BrowserRouter>
  );
}
