import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import draftToHtml from "draftjs-to-html";
import parser from "html-react-parser";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";

import "./App.css";

const TagStyles = {
  marginRight: "0.5rem",
};

const AuthorStyles = {
  fontSize: "1rem",
  padding: "0.5rem 0",
};

function renderTags(rawTags) {
  const tags = rawTags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  console.log(tags);
  return tags.map((tag) => <Chip label={tag} style={TagStyles}></Chip>);
}

const Preview = (props) => {
  const { title, editorState, tags, author, coverImage } = props;
  console.log(editorState);
  const markup = draftToHtml(editorState);

  return (
    <div className="post-container">
      <h2 className="post-title" style={{ gridColumn: "1 / -1" }}>
        {title.trim().length === 0
          ? "I WILL VANISH ONCE YOU START TYPING "
          : title.toUpperCase()}
      </h2>
      {coverImage && (
        <img
          src={coverImage}
          alt="cover"
          className="post-cover-image"
          style={{ gridColumn: "1 / -1" }}
        />
      )}
      <div className="post-content" style={{ gridColumn: "1 / -1" }}>
        <p className="post-author">
          ✍️ {author.trim().length === 0 ? "anonymous" : author}
        </p>
        {parser(markup)}
      </div>
    </div>
  );
};

export default Preview;
