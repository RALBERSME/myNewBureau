import React, { useState } from "react";

import axios from "axios";
import "./Decisions.css";
import ask from "../assets/ask.jpg";
const Decisions = ({ onCloseDecisions }) => {
  const [decision, setDecision] = useState("");
  const [decisionUrl, setDecisionUrl] = useState(`${ask}`);
  const [inputText, setInputText] = useState("");

  const resetFields = () => {
    setDecisionUrl(`${ask}`);
    setInputText("");
    setDecision("");
    document.getElementById("resetBtn").textContent =
      "Do you see how valuable these answers are?";
    document.getElementById("cta").style.opacity = "1";
    document.getElementById("input").style.opacity = "1";
  };
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const fetchDecision = async () => {
    console.log("in fetchDecision");
    const url = `https://yesno.wtf/api`;
    const response = await axios.get(url);
    console.log("response", response.data);

    const decision = response.data.answer;
    const decisionUpper = decision.toUpperCase();
    const decisionUrl = response.data.image;

    setDecision(decisionUpper);
    setDecisionUrl(decisionUrl);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchDecision();
      document.getElementById("resetBtn").textContent =
        "Click here to reset for next question";
      document.getElementById("cta").style.opacity = "0";
      document.getElementById("input").style.opacity = "0";
    }
  };
  return (
    <div className="calculatorModule">
      <div className="decisionContainer">
        <>
          <h2>{inputText}</h2>
          <h2>
            {decision && "The answer is: "} {decision}
          </h2>
          <img
            id="answerImg"
            width="350px"
            height="25rem"
            src={decisionUrl}
            alt="decisionUrl"
          ></img>
        </>

        <button id="resetBtn" onClick={resetFields}>
          Life is too short to struggle with decisions! Get your answers here!
        </button>
        <h2 id="cta">Ask a yes or no question & press ENTER: </h2>
        <input
          id="input"
          type="text"
          maxLength={50}
          minLength={3}
          value={inputText}
          placeholder="Type here your question & press ENTER"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        ></input>
      </div>
      <button id="leaveDecisionPage" onClick={onCloseDecisions}>
        x
      </button>
    </div>
  );
};

export default Decisions;
