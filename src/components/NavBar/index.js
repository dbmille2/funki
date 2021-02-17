import { GiMushroomGills } from "react-icons/gi";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineInfoCircle,
} from "react-icons/ai";

const NavBar = () => {
  return (
    <div className="pause-navbar">
      <div
        onClick={(e) => {
          e.stopPropagation();
          window.location.reload(false);
        }}
        className="pause-navbar-left"
      >
        <GiMushroomGills className="home-button" />
        <span className="app-name">funki</span>
      </div>
      <div className="pause-navbar-right">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/dbmille2/funki"
        >
          <AiOutlineGithub className="github-button" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/daniel-miller-970393178/"
        >
          <AiOutlineLinkedin className="linkedin-button" />
        </a>

        <AiOutlineInfoCircle className="info-button" />
      </div>
    </div>
  );
};

export default NavBar;
