import React from "react";
import "./Shelf.css";
import shelf from "../assets/shelf.png";
const Shelf = ({
  onShowDarling,
  onShowCalendar,
  onShowPoetry,
  onShowDecisions,
  onShowBar,
  onShowLocation,
}) => {
  return (
    <>
      <div className="bookshelf">
        <div className="book">
          <div className="side">
            <span className="title"> Calendar</span>
          </div>
          <div className="top"></div>
          <div id="book1" className="cover" onClick={onShowCalendar}>
            click here
          </div>
        </div>
        <div className="book">
          <div className="side">
            <span className="title">Poetry</span>
          </div>
          <div className="top"></div>
          <div id="book2" className="cover" onClick={onShowPoetry}>
            click here
          </div>
        </div>
        <div className="book">
          <div className="side">
            <span className="title">My Darling</span>
          </div>
          <div className="top"></div>
          <div id="book3" className="cover" onClick={onShowDarling}>
            click here
          </div>
        </div>
        <div className="book">
          <div className="side">
            <span className="title">Countries</span>
          </div>
          <div className="top"></div>
          <div id="book4" className="cover" onClick={onShowLocation}>
            Click here
          </div>
        </div>{" "}
        <div className="book">
          <div className="side">
            <span className="title">Decisions</span>
          </div>
          <div className="top"></div>
          <div id="book5" className="cover" onClick={onShowDecisions}>
            Click here
          </div>
        </div>
        <div className="book">
          <div className="side">
            <span className="title">Mini Bar</span>
          </div>
          <div className="top"></div>
          <div id="book6" className="cover" onClick={onShowBar}>
            Click here
          </div>
        </div>
      </div>
      <img id="shelf" src={shelf} alt="shelf"></img>
    </>
  );
};

export default Shelf;
