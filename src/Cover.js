import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import DetailsIcon from "@material-ui/icons/Details";
import { useState } from "react";

import { useHistory } from "react-router";
import slugify from "slugify";
import "./App.css";

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

const Cover = (props) => {
  const { post } = props;
  const { title, coverImage } = post;
  const style = titleStyle(titleStyles);

  let history = useHistory();

  function showPostDetails() {
    history.push(`/posts/${slugify(title.toLowerCase())}`, post);
  }

  return (
    <div
      className="cover-container"
      style={Object.assign({}, style, { cursor: "pointer" })}
      onClick={showPostDetails}
    >
      <img src={coverImage} alt="ljflj" className="cover-image"></img>

      <p style={style} className="post-thumbnail-title cover-title">
        {title && title.split(" ").slice(0, 15).join(" ")}
      </p>
    </div>
  );
};

export default Cover;
