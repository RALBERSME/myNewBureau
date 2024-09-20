import React, { useState } from "react";
import "./Bar.css";
import refrigerator from "../assets/refrigerator.png";
import fridge from "../assets/fridge.jpg";
import Kuehlschrank from "../assets/Kuehlschrank.png";
import restaurant from "../assets/restaurant.png";
const Bar = ({ onCloseBar }) => {
  const [showCocktailbar, setShowCocktailbar] = useState(false);
  const [showDrink, setshowDrink] = useState(false);
  let fetchedDrinkImage = "";
  function openBar() {
    setTimeout(() => {
      setShowCocktailbar(true);
      setTimeout(() => {
        if (document.getElementById("cocktailbar")) {
          document.getElementById("cocktailbar").style.animation =
            "animateBar 5s 0s linear forwards";
        }
      }, 10);
    }, 3000);
  }

  async function orderDrink() {
    setshowDrink(true);
    setShowCocktailbar(false);
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      const drinksArray = data.drinks;
      setShowCocktailbar(false);
      const output1 = document.getElementById("output1");
      const output2 = document.getElementById("output2");
      drinksArray.map((drink) => {
        output1.textContent = drink.strDrink;
        output2.setAttribute("src", drink.strDrinkThumb);
      });
    } catch {
      document
        .getElementById("output2")
        .setAttribute(
          "src",
          "https://cdn.pixabay.com/photo/2016/04/04/19/56/window-1308051_640.jpg"
        );

      document.getElementById("output1").textContent =
        "You better go back to work.";
      document.getElementById("orderNextDrink").style.display = "none";
    }
  }

  return (
    <div className="barModule">
      <div className="fridge" id="fridgeInside">
        <img
          width="300px"
          height="200px"
          src={refrigerator}
          alt="refrigerator"
        />
        <img width="300px" height="200px" src={fridge} alt="fridge" />
        <p id="order">Maybe better a cocktail.</p>
      </div>
      <div className="fridge" id="fridgeOutside" onMouseEnter={openBar}>
        <img
          width="350px"
          height="650px"
          src={Kuehlschrank}
          alt="kuelschrank"
        />
      </div>{" "}
      {showDrink && (
        <div id="cocktailbar2">
          <p id="orderNextDrink" onClick={orderDrink}>
            order next drink
          </p>
          <h2 id="output1"></h2>
          <img width="450px" height="250px" id="output2" alt="bar"></img>
          <img id="barRoom" src={fetchedDrinkImage} alt="drink"></img>
        </div>
      )}
      {showCocktailbar && !showDrink && (
        <div id="cocktailbar">
          <p id="orderDrink" onClick={orderDrink}>
            order drink
          </p>
          <img id="barRoom" src={restaurant} alt="restaurant"></img>
        </div>
      )}
      <button id="leaveBar" onClick={onCloseBar}>
        x
      </button>
    </div>
  );
};

export default Bar;
