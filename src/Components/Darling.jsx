import React, { useState } from "react";
import "./Darling.css";
import dog from "../assets/dog.jpg";
import saltyDog from "../assets/salty-dog.png";
import frame from "../assets/frame.png";
import axios from "axios";
const Darling = ({ onCloseDarling }) => {
  const [catFact, setCatFact] = useState("Cats are very clever!");
  const [dogPic, setDogPic] = useState(`${dog}`);
  const fetchCatFacts = async () => {
    try {
      const url = `https://catfact.ninja/fact`;
      const response = await axios.get(url);

      const data = response.data.fact;
      if (data.length > 150) {
        document.getElementById("infoCat").style.fontSize = "3rem";
      } else {
        document.getElementById("infoCat").style.fontSize = "4rem";
      }
      setCatFact(data);
    } catch {
      setCatFact("Sorry today no data available");
    }
  };

  const fetchDogPics = async () => {
    try {
      const url = `https://dog.ceo/api/breeds/image/random`;
      const response = await axios.get(url);

      const data = response.data.message;
      setDogPic(data);
      document.getElementById("frame").style.backgroundImage = `url(${dogPic})`;
      document.getElementById("message").textContent =
        "“My cats inspire me daily. They inspire me to get a dog!”  - Greg Curtis";
      document.getElementById("clickForFacts").style.display = "none";
    } catch {
      setDogPic(`${saltyDog}`);
    }
  };

  return (
    <div className="darlingModule">
      <img id="frame" src={frame} alt="frame"></img>
      <div id="infoCat">
        <span id="message">{catFact}</span>
        <button id="clickForFacts" onClick={fetchCatFacts}>
          more facts
        </button>
        <button id="clickForFacts" onClick={fetchDogPics}>
          change Darling
        </button>
      </div>
      <button id="closeDarlingBtn" onClick={onCloseDarling}>
        x
      </button>
    </div>
  );
};

export default Darling;
