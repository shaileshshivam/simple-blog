import { useState } from "react";

import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";

import EditPost from "./EditPost";

import { Button, IconButton, withStyles, Snackbar } from "@material-ui/core";
import {
  Publish,
  Edit,
  Archive,
  Unarchive,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";

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
  const { title, coverImage, isPublished, isArchived } = props.post;
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("");

  const [curArchivedStatus, setCurArchivedStatus] = useState(isArchived);
  const [curPublishedStatus, setCurPublishedStatus] = useState(isPublished);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  async function archivePost() {
    try {
      await firestore.collection("posts").doc(post.id).set(
        { isArchived: !curArchivedStatus },
        {
          merge: true,
        }
      );
      setCurArchivedStatus(!curArchivedStatus);
      setSnackBarMessage(
        `POST ${curArchivedStatus ? "UNARCHIVED " : "ARCHIEVED"} SUCCESSFULLY`
      );
      setSnackBarSeverity("info");
    } catch (error) {
      setSnackBarMessage(
        `ERROR ${curArchivedStatus ? "UNARCHIVING" : "ARCHIVING"} POST`
      );
      setSnackBarSeverity("error");
      console.error(error);
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

          <LightTooltip
            title={` ${curArchivedStatus ? "UNARCHIVE" : "ARCHIVE"}  POST `}
            placement="top"
          >
            <IconButton
              color="primary"
              aria-label="archive"
              onClick={archivePost}
            >
              {curArchivedStatus ? <Unarchive /> : <Archive />}
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
      </div>
    </div>
  );
};

export default PostListItem;
