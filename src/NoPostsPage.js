import Footer from "./Footer";
import Navbar from "./Navbar";

import NotesIcon from "./notes.png";

const NoPostsPage = () => {
  return (
    <div className="container">
      <Navbar />
      <div
        className="cover-page-container"
        style={{ height: "calc(100vh - 10.5rem)" }}
      >
        <div
          style={{ gridColumn: " 3 / -3", width: "100%", textAlign: "center" }}
        >
          <h2>busy writing, you will see content soon !</h2>
          <img src={NotesIcon} alt="notes" className="no-post-icon" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NoPostsPage;
