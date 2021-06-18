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

import { useEffect, useState } from "react";
import { firestore } from "./firebase";
import { useHistory } from "react-router-dom";

const backgrounds = [
  {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
  },
  {
    background: "linear-gradient(to right, #434343 0%, black 100%)",
    color: "white",
  },
  {
    background: "linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)",
    color: "#222",
  },
  {
    background: "linear-gradient(to top, #4481eb 0%, #04befe 100%)",
    color: "#ffffff",
  },

  {
    background:
      "linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
    color: "white",
  },
  {
    background: "linear-gradient(to right, #9796f0, #fbc7d4)",
    color: "#222",
  },
];

function randomBackground() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

const About = (props) => {
  const [user, setUser] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  let history = useHistory();

  const background = randomBackground();

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
        <div
          className="container"
          style={{
            background: background.background,
            color: background.color,
            zIndex: "-10",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <section
            className="about-container"
            style={{
              background: background
                ? backgrounds[Math.floor(Math.random() * backgrounds.length)]
                : "#fff",
            }}
          >
            <HomeIcon className="back-button-about" onClick={onRewind} />
            {user.profilePicURL && (
              <img
                id="profilePic"
                className="about-image"
                alt="person"
                src={user.profilePicURL}
              />
            )}
            <h2 className="about-name" style={{ color: background.color }}>
              {user.name}
            </h2>
            <Slider
              className="about-slider"
              defaultValue={1.2}
              min={0}
              max={6}
              aria-labelledby="discrete-slider-custom"
              step={0.1}
              style={{ color: background.color }}
            />
            <div className="about-player">
              <FastRewindIcon
                onClick={onRewind}
                style={{
                  fontSize: "2.5rem",
                  cursor: "pointer",
                  color: background.color,
                }}
              />
              {isPlaying ? (
                <PauseCircleOutlineIcon
                  style={{
                    fontSize: "4.5rem",
                    cursor: "pointer",
                    color: background.color,
                  }}
                  onClick={() => setIsPlaying(!isPlaying)}
                />
              ) : (
                <PlayCircleOutlineIcon
                  style={{ fontSize: "4.5rem", color: background.color }}
                  onClick={() => setIsPlaying(!isPlaying)}
                />
              )}
              <FastForwardIcon
                style={{
                  fontSize: "2.5rem",
                  cursor: "pointer",
                  color: background.color,
                }}
              />
            </div>
            {isPlaying && (
              <p className="about-bio" style={{ ...randomBackground() }}>
                {user.bio.substring(0, 400)}
              </p>
            )}
            <footer className="about-footer">
              <TwitterIcon
                className="svg-icon"
                style={{ marginRight: "0.5rem", color: background.color }}
              />
              <InstagramIcon
                className="svg-icon"
                style={{ marginLeft: "0.5rem", color: background.color }}
              />
            </footer>
          </section>

          <Footer />
        </div>
      )}
    </>
  );
};

export default About;
