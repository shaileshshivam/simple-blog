import { useLocation, useParams } from "react-router-dom";
import { Typography, Divider, IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import ShareIcon from "@material-ui/icons/Share";
import { useEffect } from "react";

import { useContext } from "react";
import PostProvider, { PostContext } from "./PostProvider";
import slugify from "slugify";
import { useState } from "react";
import { firestore } from "./firebase";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Post = (props) => {
  const { slug } = useParams();
  const { state } = useLocation();
  const [post, setPost] = useState(null);
  console.log("slug", slug);
  useEffect(() => {
    async function getPostFromSlug(slug) {
      if (state) {
        setPost(state);
        console.log("using from state in location");
      } else {
        console.log("fetching data from store");
        console.log(slug, "slug value");
        const postRef = firestore.collection("posts");
        const snapshot = await postRef.where("slug", "==", slug).get();
        setPost({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        });
      }
    }
    getPostFromSlug(slug);
  }, []);

  return <>{post && renderPost(post, slug)}</>;
};

export default Post;

function renderPost(post, slug) {
  const { title, coverImage, content, author, tags, createdAt } = post;

  async function sharePost(event) {
    console.log(navigator.share);

    if (navigator.share) {
      try {
        console.log("shared post");
        await navigator.share({
          title: title,
          text: author,
          url: `https://blog-2d02f.web.app/posts/${slug}`,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <article className="post-container">
      <Navbar />
      <h2 className="post-title">{title} </h2>
      <p className="post-author">
        {" "}
        ✍️ {author} | {createdAt}
      </p>
      <img src={coverImage} alt="" className="post-cover-image" />
      <div className="post-content">
        {parse(draftToHtml(JSON.parse(content)))}
      </div>
      <div className="post-footer">
        <IconButton onClick={sharePost}>
          <ShareIcon></ShareIcon>
        </IconButton>
      </div>
      <Footer />
    </article>
  );
}
