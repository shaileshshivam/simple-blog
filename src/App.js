import React from "react";
import "./App.css";
import Home from "./Home";
import Post from "./Post";
import AdminDashboard from "./AdminDashboard";

import AddPost from "./AddPost";

import { Route, Switch } from "react-router-dom";

import PostProvider from "./PostProvider";
import UserProvider from "./UserProvider";
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

            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/posts/:slug">
              <Post />
            </Route>
            <Route exact path="/admin">
              <AdminDashboard />
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
