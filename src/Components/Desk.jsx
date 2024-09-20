import React, { useState } from "react";
import Shelf from "./Shelf";
import Lamp from "./Lamp";
import "./Desk.css";
import Darling from "./Darling";
import Calendar from "./Calendar";
import Poetry from "./Poetry";
import Bar from "./Bar";
import Location from "./Location";
import Decisions from "./Decisions";

const Desk = () => {
  const [showShelf, setShowShelf] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [showDarling, setShowDarling] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDecisions, setShowDecisions] = useState("");
  const [showPoetry, setShowPoetry] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showBar, setShowBar] = useState(false);

  function turnLight() {
    document.getElementById("deskImage").classList.toggle("gray");
    document.getElementById("light").classList.toggle("yellow");
    setShowShelf(!showShelf);
    setLightOn(!lightOn);
  }

  return (
    <>
      {showShelf && (
        <Shelf
          onShowDarling={() => setShowDarling(true)}
          onShowCalendar={() => setShowCalendar(true)}
          onShowBar={() => setShowBar(true)}
          onShowLocation={() => setShowLocation(true)}
          onShowPoetry={() => setShowPoetry(true)}
          onShowDecisions={() => setShowDecisions(true)}
        />
      )}
      {showDarling && (
        <Darling
          onCloseDarling={() => {
            setShowDarling(false);
            setLightOn(true);
          }}
        />
      )}
      {showLocation && (
        <Location
          onCloseLocation={() => {
            setShowLocation(false);
            setLightOn(true);
          }}
        />
      )}
      {showPoetry && (
        <Poetry
          onClosePoetry={() => {
            setShowPoetry(false);
            setLightOn(true);
          }}
        />
      )}
      {!showDarling &&
        !showCalendar &&
        !showPoetry &&
        !showDecisions &&
        !showBar &&
        !showLocation && (
          <>
            <Lamp isLightOn={lightOn} />{" "}
            <button id="light" className="yellow" onClick={turnLight}>
              {lightOn ? "Finish work" : "click light on"}
            </button>
          </>
        )}
      {showCalendar && (
        <Calendar
          onCloseCalendar={() => {
            setShowCalendar(false);
            setLightOn(true);
          }}
        />
      )}
      {showBar && (
        <Bar
          onCloseBar={() => {
            setShowBar(false);
            setLightOn(true);
          }}
        />
      )}
      {showDecisions && (
        <Decisions
          onCloseDecisions={() => {
            setShowDecisions(false);
            setLightOn(true);
          }}
        />
      )}
      {lightOn && (
        <h2 id="important">
          After having read one of the books always close the book with the x
          button.
        </h2>
      )}
    </>
  );
};

export default Desk;
