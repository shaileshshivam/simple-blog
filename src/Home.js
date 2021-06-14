import React, { useContext, useEffect } from "react";
import { PostContext } from "./PostProvider";
import { UserContext } from "./UserProvider";

import { colors, Grid } from "@material-ui/core";

import "./App.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import PostThumbnail from "./PostThumbnail";
import Cover from "./Cover";
import Navbar from "./Navbar";
import Footer from "./Footer";

const style = {
  navbar: {
    display: "flex",
    padding: "1rem 2.25rem",
    justifyContent: "space-between",
  },
  avatar: {
    boxShadow:
      "rgba(0, 0, 0, 0.49) 0px 3px 6px, rgba(0, 0, 0, 0.5) 0px 3px 6px",
  },
};

const Home = (props) => {
  const posts = useContext(PostContext);
  const user = useContext(UserContext);
  console.log(user);
  console.log({ posts });
  return (
    posts &&
    posts.length > 0 && (
      <div className="container">
        <Navbar />
        <div className="cover-page-container">
          <Cover post={posts[0]}></Cover>
        </div>
        <div className="card-container">
          {posts.length > 3 &&
            posts.slice(1).map((post) => <PostThumbnail post={post} />)}
        </div>
        <Footer />
      </div>
    )
  );
};

export default Home;
