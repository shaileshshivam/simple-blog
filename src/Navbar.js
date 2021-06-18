import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/HomeRounded";

import { useHistory } from "react-router";

const Navbar = (props) => {
  let history = useHistory();

  function sendToAbout() {
    history.push("/about");
  }

  function sendToHome() {
    history.push("/");
  }

  return (
    <div className="navbar">
      <HomeIcon className="navbar-icon" onClick={sendToHome} />

      <AccountCircleIcon className="navbar-icon" onClick={sendToAbout} />
    </div>
  );
};

export default Navbar;
