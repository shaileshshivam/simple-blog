import SnapchatIcon from "./snapchat.svg";
import InstagramIcon from "./instagram.svg";
import TwitterIcon from "./twitter.svg";

import Navbar from "./Navbar";
import Footer from "./Footer";

import { useEffect, useState } from "react";
import { firestore } from "./firebase";

const bio = `Meet Katie: a girl who eats chocolate every day and sometimes even has
cake for breakfast. After creating a small food blog just for fun, Katie
watched the blog suddenly skyrocket in popularity, quickly becoming the
#1 source for healthy desserts and comfort food recipes and ranked as
one of the top 25 cooking websites on the internet – with up to 8
million viewers each month.`;

const About = (props) => {
  const [user, setUser] = useState(null);

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

  return (
    <>
      {user && (
        <>
          <Navbar />
          <section className="about-container">
            <img
              className="about-image"
              alt="person"
              src={user.profilePicURL}
            />

            <h2 className="about-name">{user.name}</h2>
            <p className="about-bio">{user.bio.substring(0, 400)}</p>
            <footer className="about-social">
              <a
                href={
                  user.instaId
                    ? `https://www.instagram.com/${user.instaId}`
                    : "https://www.instagram.com/instagram"
                }
              >
                <img
                  src={InstagramIcon}
                  alt="snapchat logo"
                  className="svg-icon"
                />
              </a>
              <a
                href={
                  user.sanpchatId
                    ? `https://www.snapchat.com/add/snapchat/${user.snapchatId}`
                    : "https://www.snapchat.com/add/snapchat"
                }
              >
                <img
                  src={TwitterIcon}
                  alt="twitter logo"
                  className="svg-icon"
                />
              </a>
              <a
                href={
                  user.twitterId
                    ? `https://www.twitter.com/${user.twitterId}`
                    : "https://www.twitter.com/twitter"
                }
              >
                <img
                  src={SnapchatIcon}
                  alt="snapchat logo"
                  className="svg-icon"
                />
              </a>
            </footer>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default About;
