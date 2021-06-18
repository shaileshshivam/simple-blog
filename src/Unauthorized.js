import { IconButton, Typography, CircularProgress } from "@material-ui/core";

import { useState } from "react";
import { AccountCircleRounded } from "@material-ui/icons";

import ErrorOutlineSharpIcon from "@material-ui/icons/ErrorOutlineSharp";

import { signIn } from "./firebase";
import { useHistory, useLocation } from "react-router-dom";

const ErrorCard = ({ error }) => {
  return (
    <div
      style={{
        textAlign: "center",
        borderRadius: "10px",
        padding: "2rem",
        boxShadow:
          "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px",
      }}
    >
      <ErrorOutlineSharpIcon style={{ color: "white", fontSize: "2.5rem" }} />
      <br></br>
      {error.message}
    </div>
  );
};
const UnauthorizedCard = (props) => {
  const { error, signIn } = props;
  return (
    <div
      style={{
        margin: 0,
        padding: "2rem",
        color: "white",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, rgb(12 73 123 / 39%), rgb(132 82 143))",
      }}
    >
      {error && <ErrorCard error={error} />}
      {!error && (
        <div
          style={{
            clipPath: "circle()",
            padding: "4rem",
            textAlign: "center",
            background: "linear-gradient(to right, #41295a, #2f0743)",

            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          }}
        >
          <IconButton variant="contained" color="primary" onClick={signIn}>
            <AccountCircleRounded
              style={{ fontSize: "4.5rem", color: "white" }}
            />
          </IconButton>
          <br />
          <Typography variant="h5" style={{ color: "white" }}>
            LOGIN{" "}
          </Typography>
        </div>
      )}
    </div>
  );
};

const Unauthorized = (props) => {
  let { pathname } = useLocation();
  let history = useHistory();
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState(null);

  async function handleSignIn() {
    try {
      setInProgress(true);
      await signIn();
      history.push(pathname);
    } catch (error) {
      setInProgress(false);
      setError(error);
    }
  }

  return (
    <div>
      {inProgress && (
        <div
          className="flex-container-centered"
          style={{
            background:
              "linear-gradient(to right, rgb(12 73 123 / 39%), rgb(132 82 143))",
          }}
        >
          <CircularProgress style={{ color: "#222" }} />
        </div>
      )}
      {!inProgress && (
        <UnauthorizedCard error={error ? error : null} signIn={handleSignIn} />
      )}
    </div>
  );
};

export default Unauthorized;
