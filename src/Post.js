import { useLocation, useParams } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import ShareIcon from "@material-ui/icons/Share";
import { useEffect } from "react";

import { useState } from "react";
import { firestore } from "./firebase";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Post = (props) => {
  const { slug } = useParams();
  const { state } = useLocation();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function getPostFromSlug(slug) {
      if (state) {
        setPost(state);
      } else {
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
  const { title, coverImage, content, author, tags, createdAt, timeToRead } =
    post;

  async function sharePost(event) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: author,
          url: `https://blog-2d02f.web.app/posts/${slug}`,
        });
      } catch (error) {}
    }
  }

  return (
    <div className="container">
      <Navbar />
      <article className="post-container">
        <h2 className="post-title">{title} </h2>
        <p className="post-author">
          {" "}
          ✍️ {author} <br /> {createdAt} | {timeToRead}
        </p>
        <img
          src={coverImage}
          alt=""
          className="post-cover-image"
          loading="lazy"
        />
        <div className="post-content">
          {parse(draftToHtml(JSON.parse(content)))}
        </div>
        <div className="post-footer">
          <IconButton onClick={sharePost}>
            <ShareIcon></ShareIcon>
          </IconButton>
        </div>
      </article>

      <Footer />
    </div>
  );
}
