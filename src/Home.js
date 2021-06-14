import React, { useContext } from "react";
import { PostContext } from "./PostProvider";

import "./App.css";

import PostThumbnail from "./PostThumbnail";
import Cover from "./Cover";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "./Loading";

import NoPostsPage from "./NoPostsPage";

const Home = (props) => {
  const posts = useContext(PostContext);

  return (
    <>
      {posts && posts.length > 0 && (
        <div className="container">
          <Navbar />
          <div className="cover-page-container">
            <Cover post={posts[0]}></Cover>
          </div>
          <div className="card-container">
            {posts.length > 1 &&
              posts
                .slice(1)
                .map((post) => <PostThumbnail key={post.id} post={post} />)}
          </div>
          <Footer />
        </div>
      )}
      {!posts && <Loading />}
      {posts && posts.length === 0 && <NoPostsPage />}
    </>
  );
};

export default Home;
