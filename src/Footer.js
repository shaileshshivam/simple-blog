import logo from "./bravos.svg";

const Footer = (props) => {
  return (
    <footer
      className="footer"
      style={{ backgroundColor: "white", alignSelf: "flex-end" }}
    >
      <img
        src={logo}
        className="footer-logo"
        alt="valar morghulis"
        title="valar morghulis"
      ></img>
    </footer>
  );
};

export default Footer;
