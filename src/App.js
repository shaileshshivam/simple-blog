import React, { useEffect, useState } from "react";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Home from "./Home";
import Post from "./Post";
import AdminDashboard from "./AdminDashboard";

import AddPost from "./AddPost";

import SignIn from "./SignIn";
import { Route, Switch, Link } from "react-router-dom";

import PostProvider from "./PostProvider";
import UserProvider from "./UserProvider";
import Admin from "./Admin";
import EditPost from "./EditPost";
import About from "./About";
import BioEditor from "./EditBio";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <PostProvider>
          <Switch>
            {/* <Route exact path="/admin">
              <Admin />
            </Route> */}
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/posts/:slug">
              <Post />
            </Route>
            <Route exact path="/admin">
              <AdminDashboard />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/admin/post/new">
              <AddPost />
            </Route>
            <Route exact path="/admin/bio">
              <BioEditor />
            </Route>
          </Switch>
        </PostProvider>
      </UserProvider>
    </div>
  );
}

export default App;
