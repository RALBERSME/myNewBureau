import React, { useState } from "react";
import "./Poetry.css";
import axios from "axios";
import typewriter from "../assets/typewriter.png";
const Poetry = ({ onClosePoetry }) => {
  const [poetryAuthor, setPoetryAuthor] = useState("This could be you!");
  const [poetryTitle, setPoetryTitle] = useState("Get creative yourself...");
  const [poetry, setPoetry] = useState(
    "If you want to read other person`s poetry, use the button on the typewriter!"
  );

  const fetchPoetry = async () => {
    const url = `https://poetrydb.org/random`;
    const response = await axios.get(url);
    const poetryAuthor = response.data[0].author;
    const poetryTitle = response.data[0].title;
    const poetry = response.data[0].lines;
    setPoetryTitle(poetryTitle);
    setPoetry(poetry);
    setPoetryAuthor(poetryAuthor);
  };

  return (
    <>
      <div className="poetryModule">
        <div className="poetryContainer">
          <div className="options">
            <button type="button" id="searchPoetryBtn" onClick={fetchPoetry}>
              click here to search poem{" "}
            </button>

            <img
              id="imagePoem"
              width="550px"
              alt="typewriter"
              src={typewriter}
            ></img>
          </div>
          <div className="showPoetry">
            <h1>
              <span className="poetryDesign">Author: </span> <br />
              {poetryAuthor}
            </h1>
            <br></br>
            <h2>
              <span className="poetryDesign">Title: </span> <br />
              {poetryTitle}
            </h2>
            <br />
            <h2>
              <span className="poetryDesign">
                Lines:
                <br></br>
              </span>{" "}
              {poetry}
            </h2>
          </div>
        </div>
        <button id="leavePoetryPage" onClick={onClosePoetry}>
          x
        </button>
      </div>
    </>
  );
};

export default Poetry;
