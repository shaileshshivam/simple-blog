import React, { useState } from "react";

import CancelIcon from "@material-ui/icons/Cancel";

import { storage, firestore } from "./firebase";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import Preview from "./Preview";

import { nanoid } from "nanoid";
import "./App.css";

import TextInput from "./TextInput";
import { Cancel, SaveSharp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import slugify from "slugify";
import readingTime from "reading-time";

const PostContainerStyles = {
  padding: "2rem",
};

function getImageName(URL) {
  return URL.substring(URL.indexOf("%2F") + 2, URL.indexOf("?"));
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function isEmpty(field) {
  return field.trim().length === 0;
}

function blockHasOnlyWhiteSpace(blocks) {
  return blocks.every((block) => block.text.trim().length === 0);
}

function isValidPost(post) {
  const { title, author, coverImage, content } = post;
  const editorState = JSON.parse(content);
  let noContent = false;

  if (
    blockHasOnlyWhiteSpace(editorState.blocks) &&
    Object.keys(editorState.entityMap).length === 0
  ) {
    noContent = true;
  }

  if (isEmpty(title) || isEmpty(author) || isEmpty(coverImage) || noContent) {
    return false;
  }

  return true;
}

const EditPost = (props) => {
  let history = useHistory();

  let { post, closeDialouge } = props;

  let [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(post.content)))
  );

  let [uid, setUid] = useState(post.id);
  let [title, setTitle] = useState(post.title);
  let [author, setAuthor] = useState(post.author);
  let [tags, setTags] = useState(post.tags);
  let [coverImage, setCoverImage] = useState(null);
  let [coverImageURL, setCoverImageURL] = useState(post.coverImage);

  let [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  let [isPostValid, setIsPostValid] = useState(false);

  function handleSnackBarClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackBarOpen(false);
  }

  function onStateChange(newState) {
    setEditorState(newState);
  }

  async function addPost() {
    const post = {
      title: title,
      author: author,
      tags: tags,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      coverImage: coverImageURL,
    };

    try {
      if (isValidPost(post)) {
        const string = editorState.getCurrentContent().getPlainText();
        post["slug"] = slugify(post.title.toLowerCase());
        post["updatedAt"] = new Date().toLocaleDateString();
        post["timeToRead"] = readingTime(string).text;
        const docRef = await firestore
          .collection("posts")
          .doc(uid)
          .update(post);

        setIsPostValid(true);
        setIsSnackBarOpen(true);
        setTimeout(closeDialouge, 1500);
      } else {
        setIsSnackBarOpen(true);
      }
    } catch (error) {}
  }

  async function uploadImage(file, bucket) {
    try {
      const response = await storage
        .ref()
        .child(bucket)
        .child(`${nanoid().toUpperCase()}.${file.type.substr(6)}`)
        .put(file, {
          contentType: file.type,
        });

      const imageURL = await response.ref.getDownloadURL();

      return {
        data: {
          link: imageURL,
        },
      };
    } catch (e) {
      return e;
    }
  }

  async function handleCoverImageUpload(event) {
    const coverImage = event.target.files[0];
    setCoverImage(coverImage);
    const response = await uploadImage(coverImage, "cover-images");
    if (response instanceof Error) {
      return;
    }
    setCoverImageURL(response.data.link);
  }

  async function handleContentImageUpload(file) {
    const response = await uploadImage(file, "content-images");

    if (response instanceof Error) {
      return null;
    }
    return response;
  }

  return (
    <Grid container spacing="2">
      <Grid item lg="6" sm="12" style={PostContainerStyles}>
        <h1>Edit Post</h1>
        <IconButton
          onClick={closeDialouge}
          style={{ position: "absolute", right: "1rem", top: 0 }}
        >
          <CancelIcon style={{ fontSize: "2.75rem" }} />
        </IconButton>
        <TextInput
          name="title"
          required={true}
          placeholder="title"
          value={title}
          onChange={setTitle}
        ></TextInput>

        <TextInput
          name="author"
          required={true}
          value={author}
          placeholder="author"
          onChange={setAuthor}
        ></TextInput>

        <TextInput
          name="tags"
          required={false}
          placeholder="tags"
          value={tags}
          onChange={setTags}
        ></TextInput>

        <Editor
          toolbar={{
            image: {
              uploadCallback: handleContentImageUpload,
              defaultSize: {
                width: "100%",
              },
            },
          }}
          editorClassName="editor"
          toolbarClassName="toolbar"
          editorState={editorState}
          onEditorStateChange={onStateChange}
        ></Editor>
        <div className="image-upload-container">
          <label className="cover-image-label" for="coverImage">
            add cover image
          </label>
          <input
            type="file"
            required
            placeholder="Cover Image"
            id="coverImage"
            onChange={handleCoverImageUpload}
          ></input>
          <Typography variant="button">
            {coverImage && coverImage.name}
            {coverImage !== "" && getImageName(coverImageURL)}
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<SaveSharp />}
          style={{
            marginTop: "1rem",
            marginRight: "1rem",
          }}
          onClick={addPost}
        >
          SAVE POST
        </Button>

        <Button
          variant="contained"
          startIcon={<Cancel />}
          style={{
            marginTop: "1rem",
          }}
          onClick={closeDialouge}
        >
          CANCEL
        </Button>
        <Snackbar
          open={isSnackBarOpen}
          autoHideDuration={3000}
          onClose={handleSnackBarClose}
        >
          <Alert
            onClose={handleSnackBarClose}
            severity={isPostValid ? "success" : "error"}
          >
            {isPostValid
              ? "Post Updated "
              : "Error updating post, make sure you add all the required fields"}
          </Alert>
        </Snackbar>
      </Grid>
      <Grid
        lg={6}
        sm={12}
        style={{
          backgroundColor: "gold",
          padding: "2rem",
          border: "1px solid black",
          minHeight: "100vh ",
        }}
      >
        <Preview
          title={title}
          editorState={convertToRaw(editorState.getCurrentContent())}
          tags={tags}
          author={author}
          coverImage={coverImageURL}
        ></Preview>
      </Grid>
    </Grid>
  );
};

export default EditPost;
