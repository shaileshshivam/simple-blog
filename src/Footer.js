import { Typography } from "@material-ui/core";

const Footer = (props) => {
  return (
    <footer
      className="footer"
      style={{ backgroundColor: "white", alignSelf: "flex-end" }}
    >
      <Typography className="footer-text">Valar Morghulis</Typography>
    </footer>
  );
};

export default Footer;
