import React from "react";
import draftToHtml from "draftjs-to-html";
import parser from "html-react-parser";

import "./App.css";

const Preview = (props) => {
  const { title, editorState, tags, author, coverImage } = props;

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
