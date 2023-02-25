import React, { useState, useContext } from "react";
import Leaderboard from "./Leaderboard";
import langContext from "../context/lang";

import "./Menu.scss";

const Menu = ({ startGame, isFirstRender }) => {
  // Language Context.
  const { lang, setLang, langData } = useContext(langContext);

  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    if (isShown) {
      let board = document.getElementById("leaderboard");
      board.animate([{ transform: "translate(-50%, -150svh)" }], {
        duration: 300,
        fill: "forwards",
        easing: "cubic-bezier(.35,-0.14,.28,1.36)",
      });
      setTimeout(() => {
        setIsShown(current => !current);
      }, 200);
    } else {
      setIsShown(current => !current);
      setTimeout(() => {
        let board = document.getElementById("leaderboard");
        board.animate([{ transform: "translate(-50%, -50%)" }], {
          duration: 300,
          fill: "forwards",
          easing: "cubic-bezier(.35,-0.14,.28,1.36)",
        });
      }, 200);
    }
  };

  return (
    <>
      <div className="menu">
        <h1 className="menu__title">FLAGS!</h1>
        <button className="menu__btn--start" onClick={startGame}>
          {langData.menu.playbtn}
        </button>
        <button className="menu__btn--leaderboard" onClick={handleClick}>
          {langData.menu.leaderbtn}
        </button>
        <div className="menu__language">
          {lang === "en" ? (
            <>
              <h6>Cambiar idioma</h6>
              <button className="menu__language__btn" onClick={() => setLang("es")}>
                🇪🇸
              </button>
            </>
          ) : (
            <>
              <h6>Switch language</h6>
              <button className="menu__language__btn" onClick={() => setLang("en")}>
                🇺🇸
              </button>
            </>
          )}
        </div>
      </div>
      {isShown ? <Leaderboard close={handleClick} isFirstRender={isFirstRender} /> : <></>}
    </>
  );
};

export default Menu;
