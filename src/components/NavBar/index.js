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
        <AiOutlineGithub className="github-button" />
        <AiOutlineLinkedin className="linkedin-button" />
        <AiOutlineInfoCircle className="info-button" />
      </div>
    </div>
  );
};

export default NavBar;
