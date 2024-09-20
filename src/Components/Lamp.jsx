import "./Lamp.css";
import deskImage from "../assets/desk.jpg";
const Lamp = ({ isLightOn }) => {
  return (
    <div className="centrum">
      <img
        id="deskImage"
        alt="lamp"
        className={isLightOn ? " " : "gray"}
        src={deskImage}
      ></img>
    </div>
  );
};

export default Lamp;
