import React, { useContext, useState } from "react";
import { auth, storage, firestore } from "./firebase";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextField from "@material-ui/core/TextField";

import FormData from "form-data";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import Preview from "./Preview";

import PostAddIcon from "@material-ui/icons/PostAdd";
import { UserContext } from "./UserProvider";
import Icon from "@material-ui/core/Icon";
import { nanoid } from "nanoid";
import ImageIcon from "./image.svg";
import "./App.css";

import TextInput from "./TextInput";
import { Cancel } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import slugify from "slugify";
const PostContainerStyles = {
  padding: "2rem",
};

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

const AddPost = (props) => {
  let user = useContext(UserContext);
  let history = useHistory();

  let [editorState, setEditorState] = useState(EditorState.createEmpty());
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [tags, setTags] = useState("");
  let [coverImage, setCoverImage] = useState(null);
  let [coverImageURL, setCoverImageURL] = useState("");

  let [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  let [isPostValid, setIsPostValid] = useState(false);

  function goBack() {
    history.push("/admin");
  }

  function handleSnackBarClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackBarOpen(false);
  }

  function onStateChange(newState) {
    setEditorState(newState);
    console.log(convertToRaw(newState.getCurrentContent()));
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
        setIsPostValid(true);
        setIsSnackBarOpen(true);
        post["isPublished"] = false;
        post["isArchived"] = false;
        post["slug"] = slugify(post.title.toLowerCase());
        post["createdAt"] = new Date().toLocaleDateString();
        const docRef = await firestore.collection("posts").add(post);
        setTimeout(() => history.push("/admin"), 1500);
      } else {
        console.log("don't add shit content");
        setIsSnackBarOpen(true);
      }
    } catch (e) {}
  }

  async function uploadImage(file, bucket) {
    console.log(`uploading file.${file.type.substr(6)}`);
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
      console.log(e.customData.serverResponse);
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
    console.log("coverImageURL", response.data.link);
  }

  async function handleContentImageUpload(file) {
    const response = await uploadImage(file, "content-images");

    if (response instanceof Error) {
      return null;
    }

    console.log(response);

    return response;
  }

  return (
    <Grid container spacing="1">
      <Grid item lg="6" sm="12" style={PostContainerStyles}>
        <h1>Add Post</h1>

        <TextInput
          name="title"
          required={true}
          placeholder="title"
          onChange={setTitle}
        ></TextInput>

        <TextInput
          name="author"
          required={true}
          placeholder="author"
          onChange={setAuthor}
        ></TextInput>

        <TextInput
          name="tags"
          required={false}
          placeholder="tags"
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
          </Typography>
        </div>
        <Button
          variant="contained"
          startIcon={<PostAddIcon />}
          style={{
            marginTop: "1rem",
            marginRight: "1rem",
          }}
          onClick={addPost}
        >
          ADD POST
        </Button>

        <Button
          variant="contained"
          startIcon={<Cancel />}
          style={{
            marginTop: "1rem",
          }}
          onClick={goBack}
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
              ? "Post added "
              : "Error adding post, make sure you add all the required fields"}
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

export default AddPost;
