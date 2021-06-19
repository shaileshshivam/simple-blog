import slugify from "slugify";

import "./App.css";
import { useHistory } from "react-router-dom";

const titleStyles = [
  {
    background: "linear-gradient(to right, #000000, #434343)",
    color: "whitesmoke",
  },
  {
    background: "linear-gradient(to right, #bc4e9c, #f80759)",
    color: "#f2eef3",
  },
  {
    background: "linear-gradient(to right, #ffe259, #ffa751)",
    color: "#222",
  },
  {
    background: "linear-gradient(to right, #76b852, #8dc26f)",
    color: "#462D30",
  },
  {
    background: "linear-gradient(to right, #5c258d, #4389a2)",
    color: "#fff",
  },
  {
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    color: "#fff",
  },
  {
    background: "linear-gradient(to right, #eb3349, #f45c43)",
    color: "#fff",
  },
  {
    background: "linear-gradient(to right, #ffe259, #ffa751)",
    color: "#222",
  },
  {
    background: "linear-gradient(to right, #5c258d, #4389a2)",
    color: "#fff",
  },
];

function titleStyle(titleStyles) {
  const index = Math.floor(Math.random() * titleStyles.length);
  return titleStyles[index];
}

const PostThumnail = (props) => {
  const style = titleStyle(titleStyles);
  const { post } = props;
  const { title, coverImage } = post;

  let history = useHistory();

  function showPostDetails() {
    history.push(`/posts/${slugify(title.toLowerCase())}`, post);
  }

  return (
    post && (
      <div
        className="post-thumbnail-container"
        style={Object.assign({}, style, { cursor: "pointer" })}
        onClick={showPostDetails}
      >
        <img
          className="post-thumbnail-img"
          src={coverImage}
          alt="cover"
          loading="lazy"
        ></img>
        <p style={style} className="post-thumbnail-title">
          {title.split(" ").slice(0, 15).join(" ")}
        </p>
      </div>
    )
  );
};

export default PostThumnail;
