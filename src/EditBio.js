import { useState, useContext } from "react";
import {
  Typography,
  Button,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { firestore, storage } from "./firebase";

import { UserContext } from "./UserProvider";

import Unauthorized from "./Unauthorized";
import { useHistory } from "react-router-dom";

const style = {
  input: {
    fontSize: "1.2rem",
    width: "100%",
    padding: "1rem 0.25rem",
    outline: "none",
    border: "none",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
    borderRadius: "5px",
    paddingLeft: "1rem",
  },
};

function isEmpty(field) {
  return field.trim().length === 0;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BioEditor = (props) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [profilePicURL, setProfilePicURL] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [instaId, setInstaId] = useState("");
  const [snapchatId, setSnapchatId] = useState("");

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState();
  const [snackBarSeverity, setSnackBarSeverity] = useState();

  let history = useHistory();

  let { user, pending, isLoggedIn } = useContext(UserContext);

  async function updateProfileInformation() {
    if (isEmpty(name)) {
      setSnackBarMessage("NAME CANNOT BE EMPTY");
    }
    if (isEmpty(bio)) {
      setSnackBarMessage("BIO CANNOT BE EMPTY");
    }

    if (isEmpty(profilePicURL)) {
      setSnackBarMessage("ADD PROFILE PICTURE ");
    }
    if (isEmpty(name) || isEmpty(bio) || isEmpty(profilePicURL)) {
      setSnackBarSeverity("error");
      setIsSnackBarOpen(true);
    } else {
      try {
        const docRef = firestore.collection("users").doc(user.uid);
        await docRef.set(
          {
            name,
            bio,
            profilePicURL,
            twitterId,
            instaId,
            snapchatId,
          },
          { merge: true }
        );

        setSnackBarSeverity("success");
        setSnackBarMessage("DETAILS UPDATED");
        setIsSnackBarOpen(true);
        setTimeout(() => history.push("/admin"), 1600);
      } catch (error) {
        setSnackBarSeverity("error");
        setSnackBarMessage("ERROR WHILE UPDATING");
        setIsSnackBarOpen(true);
      }
    }
  }

  async function uploadImage(file, bucket) {
    try {
      const response = await storage
        .ref()
        .child(bucket)
        .child(`${name}.${file.type.substr(6)}`)
        .put(file, {
          contentType: file.type,
        });

      const imageURL = await response.ref.getDownloadURL();
      setSnackBarSeverity("info");
      setSnackBarMessage("IMAGE UPLOAD COMPLETE");
      setIsSnackBarOpen(true);
      return {
        data: {
          link: imageURL,
        },
      };
    } catch (e) {
      setSnackBarSeverity("error");
      setSnackBarMessage("IMAGE UPLOAD FAILED");
      setIsSnackBarOpen(true);
      return e;
    }
  }

  async function handleCoverImageUpload(event) {
    const profileImage = event.target.files[0];
    setProfilePic(profileImage);
    const response = await uploadImage(profileImage, "profile-images");
    if (response instanceof Error) {
      return;
    }

    setProfilePicURL(response.data.link);
  }

  return (
    <div>
      {pending && (
        <div className="flex-container-centered">
          <CircularProgress />
        </div>
      )}
      {!pending && !isLoggedIn && <Unauthorized />}
      {!pending && isLoggedIn && (
        <div className="bio-editor-container">
          <Typography
            variant="h4"
            style={{ padding: "1rem 0", textAlign: "center" }}
          >
            {" "}
            UPDATE PROFILE INFORMATION{" "}
          </Typography>
          <div className="image-upload-container" style={{ margin: 0 }}>
            <label className="cover-image-label" for="coverImage">
              upload profile pic
            </label>
            <input
              type="file"
              required
              placeholder="Cover Image"
              id="coverImage"
              onChange={handleCoverImageUpload}
            ></input>
            <Typography variant="button">
              {profilePic && profilePic.name}
            </Typography>
          </div>
          <input
            style={style.input}
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={style.input}
            type="text"
            placeholder="Twitter ID"
            required
            onChange={(e) => setTwitterId(e.target.value)}
          />
          <input
            style={style.input}
            type="text"
            placeholder="Instagram ID"
            required
            onChange={(e) => setInstaId(e.target.value)}
          />
          <input
            style={style.input}
            type="text"
            placeholder="Snapchat ID"
            required
            onChange={(e) => setSnapchatId(e.target.value)}
          />
          <label style={{ padding: "0.25rem 0.1rem" }}>
            Bio ( 400 chars max )
          </label>
          <textarea
            style={style.input}
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          ></textarea>

          <Button variant="outlined" onClick={updateProfileInformation}>
            UPDATE
          </Button>

          <Snackbar
            open={isSnackBarOpen}
            autoHideDuration={1500}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={() => setIsSnackBarOpen(false)}
          >
            <Alert
              onClose={() => setIsSnackBarOpen(false)}
              severity={snackBarSeverity}
            >
              {snackBarMessage}
            </Alert>
          </Snackbar>
        </div>
      )}
    </div>
  );
};

export default BioEditor;
