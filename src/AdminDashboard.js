import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import { Switch, withStyles, Tooltip } from "@material-ui/core";
import {
  AccountCircle,
  Fullscreen,
  PostAdd,
  PostAddRounded,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserProvider";
import Avatar from "@material-ui/core/Avatar";

import { auth, signIn } from "./firebase";
import ErrorMessage from "./ErrorMessage";

import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useHistory } from "react-router-dom";

import PostList from "./PostList";
import Unauthorized from "./Unauthorized";

const style = {
  navbar: {
    display: "flex",
    padding: "1rem 2.25rem",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  displayName: {
    marginRight: "1rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  avatar: {
    boxShadow:
      "rgba(0, 0, 0, 0.49) 0px 3px 6px, rgba(0, 0, 0, 0.5) 0px 3px 6px",
  },

  addPost: {
    color: "#222",
  },
};

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    fontWeight: "bolder",
  },
}))(Tooltip);

const AdminDashboard = (props) => {
  const { user, pending, isLoggedIn } = useContext(UserContext);
  const history = useHistory();

  function addNewPost() {
    history.push("admin/post/new");
  }

  function signOut() {
    auth.signOut();
    history.push("/");
  }

  function addBio() {
    history.push("admin/bio", user.uid);
  }

  console.log(user, "from admin");
  return (
    <div>
      {user && (
        <div style={style.navbar}>
          <Typography style={style.displayName} variant="button">
            HI, {user.displayName}
          </Typography>
          <Avatar
            style={style.avatar}
            alt={user.displayName}
            src={user.photoURL}
          ></Avatar>
        </div>
      )}
      {user && (
        <div className="admin-dashboard-container">
          <div className="admin-dashboard-sidebar">
            <LightTooltip placement="bottom" title="ADD POST">
              <IconButton
                size="large"
                style={style.addPost}
                onClick={addNewPost}
              >
                <PostAddRounded style={{ fontSize: "3.5rem" }} />
              </IconButton>
            </LightTooltip>
            <LightTooltip placement="bottom" title="ADD BIO">
              <IconButton size="large" style={style.addPost} onClick={addBio}>
                <AccountCircle style={{ fontSize: "3.5rem" }} />
              </IconButton>
            </LightTooltip>

            <LightTooltip placement="bottom" title="SIGN OUT">
              <IconButton size="large" style={style.addPost} onClick={signOut}>
                <ExitToAppIcon style={{ fontSize: "3.5rem" }} />
              </IconButton>
            </LightTooltip>
          </div>
          <PostList></PostList>
        </div>
      )}

      {pending === false && !isLoggedIn && <Unauthorized />}

      {pending && (
        <div
          className="flex-container-centered"
          style={{
            background: "linear-gradient(to right, #ffe259, #ffa751)",
          }}
        >
          <CircularProgress style={{ color: "#41295a" }} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
