import React, { useState, Suspense } from "react";
import "./App.css";
import Home from "./Home";

import { Route, Switch, useLocation } from "react-router-dom";

import PostProvider from "./PostProvider";
import UserProvider from "./UserProvider";

import { CircularProgress } from "@material-ui/core";

const Post = React.lazy(() => import("./Post"));
const About = React.lazy(() => import("./About"));
const EditBio = React.lazy(() => import("./EditBio"));
const AddPost = React.lazy(() => import("./AddPost"));
const AdminDashboard = React.lazy(() => import("./AdminDashboard"));

const backgrounds = [
  {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
  },
  {
    background: "linear-gradient(to right, #434343 0%, black 100%)",
    color: "white",
  },
  {
    background: "linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)",
    color: "#222",
  },
  {
    background: "linear-gradient(to top, #4481eb 0%, #04befe 100%)",
    color: "#ffffff",
  },

  {
    background:
      "linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
    color: "white",
  },
  {
    background: "linear-gradient(to right, #9796f0, #fbc7d4)",
    color: "#222",
  },
];

function randomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

const Loading = () => {
  return (
    <div className="flex-container-centered">
      <CircularProgress />
    </div>
  );
};

function App() {
  const { pathname } = useLocation();
  let [theme, changeTheme] = useState(randomBackground());

  return (
    <div
      className="App"
      style={{
        background: pathname === "/about" ? theme.background : "#fff",
        color: pathname === "/about" ? theme.color : "initial",
      }}
    >
      <UserProvider>
        <PostProvider>
          <Switch>
            <Suspense fallback={<Loading />}>
              <Route exact path="/">
                <Home></Home>
              </Route>

              <Route exact path="/about">
                <About changeTheme={changeTheme} theme={theme} />
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
                <EditBio />
              </Route>
            </Suspense>
          </Switch>
        </PostProvider>
      </UserProvider>
    </div>
  );
}

export default App;
