import React, { useEffect, useState } from "react";
import "./Location.css";
import axios from "axios";

const Location = ({ onCloseLocation }) => {
  const [country, setCountry] = useState("Enter country name");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState("");
  const [population, setPopulation] = useState();
  const [capital, setCapital] = useState("");
  const [currency, setCurrency] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [cborders, setCBorders] = useState([]);
  const onCountryChange = (e) => {
    setCountry(e.target.value.toLowerCase());
  };
  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }
  function emptyInputField() {
    setCountry("");
  }
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const url = `https://restcountries.com/v2/name/${country}`;

        const response = await axios.get(url);
        console.log("resp", response);
        setFlag(response.data[0].flag);

        setCurrency(response.data[0].currencies[0].code);

        setPopulation(numberWithCommas(response.data[0].population));
        setCapital(response.data[0].capital);
        setRegion(response.data[0].region);
        setName(response.data[0].name);
        setLanguage(response.data[0].languages[0].name);
        setCBorders(response.data[0].borders);
        console.log(
          "data",
          response.data[0],
          "neighbours",
          response.data[0].borders[0]
        );
      } catch {
        console.log("no fetching");
      }
    };

    fetchCountry();
  }, [country]);
  return (
    <div className="locationModule">
      <div className="countryInput">
        <label>Enter country name: </label>
        <input
          type="text"
          id="country"
          className="searchCountry"
          placeholder="enter here"
          value={country}
          onChange={onCountryChange}
          onFocus={emptyInputField}
        />
        {name && (
          <div className="card">
            <div className="flags">
              <img className="flagImg" src={flag} alt="flag" />
              <img className="flagImg" src={flag} alt="flag" />
              <img className="flagImg" src={flag} alt="flag" />
            </div>
            <h1 id="countryName">{name.toUpperCase()}</h1>

            <p>Region: {region}</p>
            <p>Capital: {capital}</p>
            <p>Population: {population} inhabitants</p>
            <p>Currency: {currency}</p>
            <p>Main language: {language}</p>
            <div className="neighbours">
              {cborders && <p>Neighbour(s):</p>}
              {cborders &&
                cborders.map(function (item, i) {
                  console.log("test", item);
                  return (
                    <span id="neighbours" key={i}>
                      {item},
                    </span>
                  );
                })}
            </div>
          </div>
        )}
      </div>{" "}
      <button id="leaveLocationPage" onClick={onCloseLocation}>
        x
      </button>
    </div>
  );
};

export default Location;
