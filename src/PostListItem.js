import { useState } from "react";

import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/Delete";

import EditPost from "./EditPost";

import {
  Button,
  IconButton,
  withStyles,
  Snackbar,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
} from "@material-ui/core";
import { Edit, Visibility, VisibilityOff } from "@material-ui/icons";

import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

import { firestore } from "./firebase";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    fontWeight: "bolder",
  },
}))(Tooltip);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PostListItem = (props) => {
  const { post } = props;
  const { title, coverImage, isPublished } = props.post;
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  const [curPublishedStatus, setCurPublishedStatus] = useState(isPublished);

  const [disableDelete, setDisableDelete] = useState(true);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = (event) => {
    const { value } = event.target;
    if (value === post.title.split(" ").slice(0, 5).join(" ")) {
      setDisableDelete(false);
    }
  };

  const history = useHistory();

  async function publishPost() {
    try {
      await firestore.collection("posts").doc(post.id).set(
        { isPublished: !curPublishedStatus },
        {
          merge: true,
        }
      );
      setCurPublishedStatus(!curPublishedStatus);
      setSnackBarMessage(
        ` POST ${
          curPublishedStatus ? "UNPUBLISHED " : "PUBLISHED"
        } SUCCESSFULLY`
      );
      setSnackBarSeverity("success");
    } catch (error) {
      setSnackBarMessage(
        `ERROR ${curPublishedStatus ? "UNPUBLISHING" : "PUBLISHING"} POST`
      );
      setSnackBarSeverity("error");
      console.error(error);
    }

    setIsSnackBarOpen(true);
  }

  async function deletePost() {
    const { id: uid } = post;
    try {
      const docRef = firestore.collection("posts").doc(uid);
      await docRef.delete();
      setSnackBarSeverity("success");
      setSnackBarMessage("POST DELETED SUCCESSFULLY");
      setTimeout(() => window.location.reload(), 100);
    } catch (error) {
      setSnackBarSeverity("error");
      setSnackBarMessage("NOT ABLE TO DELETE POST");
    }
    setIsSnackBarOpen(true);
  }

  function closeSnackBar() {
    setIsSnackBarOpen(false);
  }
  return (
    <div className="post-list-item-container">
      <img
        src={coverImage}
        alt={"lfjlfj"}
        className="post-list-item-image"
      ></img>
      <div>
        <h2 className="post-list-item-title">{title}</h2>

        <div className="post-list-item-toolbar">
          <LightTooltip title="EDIT POST" placement="top">
            <IconButton
              color="primary"
              aria-label="edit"
              onClick={handleClickOpen}
            >
              <Edit />
            </IconButton>
          </LightTooltip>

          <LightTooltip
            title={` ${curPublishedStatus ? "UNPUBLISH" : "PUBLISH"}  POST `}
            placement="top"
          >
            <IconButton
              color="primary"
              aria-label="publish"
              onClick={publishPost}
            >
              {curPublishedStatus ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </LightTooltip>

          <LightTooltip title={"DELETE POST"} placement="top">
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => setShowDelete(true)}
            >
              <DeleteIcon />
            </IconButton>
          </LightTooltip>
        </div>
        <Snackbar
          open={isSnackBarOpen}
          autoHideDuration={1500}
          onClose={closeSnackBar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={closeSnackBar} severity={snackBarSeverity}>
            {snackBarMessage}
          </Alert>
        </Snackbar>

        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullScreen={true}
          fullWidth={true}
          style={{
            boxSizing: "border-box",
          }}
        >
          <EditPost post={post} closeDialouge={handleClose} />
        </Dialog>

        <Dialog
          open={showDelete}
          onClose={() => setShowDelete(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            <strong>Are you sure you want to delete this post ?</strong>
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: "red" }}>
              This is a permanent operation and cannot be reverted, please type
              below given text to delete post <br /> <br />
              <strong style={{ color: "green" }}>
                {`${post.title.split(" ").slice(0, 5).join(" ")}`}
              </strong>
            </DialogContentText>
            <TextField
              autoFocus
              id="deleteDialogue"
              placeholder="Post Title"
              type="text"
              fullWidth
              onChange={confirmDelete}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDelete(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={deletePost}
              color="primary"
              disabled={disableDelete}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default PostListItem;
