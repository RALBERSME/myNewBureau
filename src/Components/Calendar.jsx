import React from "react";
import "./Calendar.css";
import { useState } from "react";
const Calendar = ({ onCloseCalendar }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
      setEditingEvent(null);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(
        2,
        "0"
      )}`,
      text: eventText,
    };

    let updatedEvents = [...events];

    if (editingEvent) {
      updatedEvents = updatedEvents.map((event) =>
        event.id === editingEvent.id ? newEvent : event
      );
    } else {
      updatedEvents.push(newEvent);
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    setEvents(updatedEvents);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      hours: event.time.split(":")[0],
      minutes: event.time.split(":")[1],
    });
    setEventText(event.text);
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);

    setEvents(updatedEvents);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    setEventTime((prevTime) => ({
      ...prevTime,
      [name]: value.padStart(2, "0"),
    }));
  };

  return (
    <div className="calendarModule ">
      <div className="calendar">
        <h1 className="heading">Calendar</h1>
        <h2 id="callToEnter">click on day to enter your appointment</h2>
        <div className="dateDisplay">
          {" "}
          <div className="buttons" id="btnLeft">
            <i className="fas fa-arrow-circle-left" onClick={prevMonth}></i>
          </div>
          <h2 className="year">
            {currentYear}
            <span className="month"> {monthsOfYear[currentMonth]}</span>
          </h2>
          <div className="buttons">
            <i className="fas fa-arrow-circle-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="entries">
        {showEventPopup && (
          <div className="modal">
            <div className="timeInput">
              <div className="inputTime">
                <div> Hour: </div>
                <input
                  type="number"
                  name="hours"
                  min={0}
                  max={23}
                  className="hours"
                  value={eventTime.hours}
                  onChange={handleTimeChange}
                />{" "}
                <div>Minutes: </div>
                <input
                  type="number"
                  name="minutes"
                  min={0}
                  max={59}
                  className="minutes"
                  value={eventTime.minutes}
                  onChange={handleTimeChange}
                />
              </div>
            </div>
            <textarea
              placeholder="Enter your text up to 55 characters"
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 55) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>
            {eventText && (
              <button className="eventBtn" onClick={handleEventSubmit}>
                {editingEvent ? "Update Event" : "Add Event"}
              </button>
            )}
            <button
              id="closeEvent"
              className="closeEvent"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="fas fa-window-close"></i>
            </button>
          </div>
        )}
        <div className="eventBox">
          {events.map((event, index) => (
            <div className="event" key={index}>
              <div className="eventWrapper">
                <div className="eventDate">{`${
                  monthsOfYear[event.date.getMonth()]
                } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
                <div className="eventTime">{event.time}</div>
              </div>
              <div className="eventText">{event.text}</div>
              <div className="eventButtons">
                <i
                  className="fas fa-edit"
                  onClick={() => handleEditEvent(event)}
                ></i>
                <i
                  className="fas fa-x"
                  onClick={() => handleDeleteEvent(event.id)}
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
      <button id="closeCalendar" onClick={onCloseCalendar}>
        x
      </button>
    </div>
  );
};

export default Calendar;
