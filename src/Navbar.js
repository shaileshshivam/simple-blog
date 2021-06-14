import { Avatar } from "@material-ui/core";
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
      <Avatar className="navbar-avatar" onClick={sendToHome}>
        <HomeIcon />
      </Avatar>

      <Avatar className="navbar-avatar" onClick={sendToAbout}>
        <AccountCircleIcon />
      </Avatar>
    </div>
  );
};

export default Navbar;
