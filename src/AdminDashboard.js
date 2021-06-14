import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withStyles, Tooltip } from "@material-ui/core";
import { AccountCircle, Home, PostAddRounded } from "@material-ui/icons";
import React from "react";
import { useContext } from "react";
import { UserContext } from "./UserProvider";
import Avatar from "@material-ui/core/Avatar";

import { auth } from "./firebase";

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

  function goToHome() {
    history.push("/");
  }

  function addBio() {
    history.push("admin/bio", user.uid);
  }

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
            <LightTooltip placement="bottom" title="HOME">
              <IconButton size="large" style={style.addPost} onClick={goToHome}>
                <Home style={{ fontSize: "3.5rem" }} />
              </IconButton>
            </LightTooltip>
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
