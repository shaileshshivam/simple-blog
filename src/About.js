import Navbar from "./Navbar";
import Footer from "./Footer";
import Slider from "@material-ui/core/Slider";

import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";

import HomeIcon from "@material-ui/icons/Home";

import { useEffect, useState, useRef } from "react";
import { firestore } from "./firebase";
import { useHistory } from "react-router-dom";

const bio = `Meet Katie: a girl who eats chocolate every day and sometimes even has
cake for breakfast. After creating a small food blog just for fun, Katie
watched the blog suddenly skyrocket in popularity, quickly becoming the
#1 source for healthy desserts and comfort food recipes and ranked as
one of the top 25 cooking websites on the internet – with up to 8
million viewers each month.`;

function getRGB(colors) {
  return `rgb( ${colors[0]}, ${colors[1]}, ${colors[2]})`;
}

const About = (props) => {
  const [user, setUser] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  let history = useHistory();

  const [background, setBackground] = useState(
    "linear-gradient(to right, #948e99, #2e1437)"
  );

  useEffect(() => {
    async function getUserInfo() {
      const snapshot = await firestore.collection("users").get();
      setUser({
        id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
      });
    }

    getUserInfo();
  }, []);

  function onRewind() {
    history.push("/");
  }

  return (
    <>
      {user && (
        <>
          <section
            className="about-container"
            style={{
              background: background ? background : "#fff",
            }}
          >
            <HomeIcon className="back-button-about" onClick={onRewind} />
            <img
              id="profilePic"
              className="about-image"
              alt="person"
              src={user.profilePicURL}
            />
            <h2 className="about-name">{user.name}</h2>
            <Slider
              defaultValue={1.2}
              min="0"
              max="5"
              aria-labelledby="discrete-slider-custom"
              step={0.1}
              style={{ width: "85%", margin: "0 auto", color: "white" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                padding: "0 2rem",
              }}
            >
              <FastRewindIcon
                onClick={onRewind}
                style={{ fontSize: "2.5rem", cursor: "pointer" }}
              />
              {isPlaying ? (
                <PauseCircleOutlineIcon
                  style={{ fontSize: "5rem", cursor: "pointer" }}
                  onClick={() => setIsPlaying(!isPlaying)}
                />
              ) : (
                <PlayCircleOutlineIcon
                  style={{ fontSize: "5rem" }}
                  onClick={() => setIsPlaying(!isPlaying)}
                />
              )}
              <FastForwardIcon
                style={{ fontSize: "2.5rem", cursor: "pointer" }}
              />
            </div>
            {isPlaying && (
              <p className="about-bio">{user.bio.substring(0, 400)}</p>
            )}
            <footer className="about-footer">
              <TwitterIcon
                className="svg-icon"
                style={{ marginRight: "0.5rem" }}
              />
              <InstagramIcon
                className="svg-icon"
                style={{ marginLeft: "0.5rem" }}
              />
            </footer>
          </section>
        </>
      )}
    </>
  );
};

export default About;
