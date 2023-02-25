import React, { useState, useContext } from "react";
import Leaderboard from "./Leaderboard";
import langContext from "../context/lang";
import "./Menu.scss";

const Menu = ({ startGame, isFirstRender }) => {
  // Language Context.
  const { lang, setLang, langData, translations } = useContext(langContext);

  let langArr = Object.values(translations);

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

  const showLangMenu = () => {
    let elm = document.getElementById("langContainer");
    let langBtn = document.getElementById("langBtn");
    if (elm.style.opacity == 0) {
      elm.style.opacity = 1;
      langBtn.style.boxShadow = "0 1px 0 hsl(220, 5%, 15%)";
      langBtn.style.transform = "translateY(3px)";
    } else {
      elm.style.opacity = 0;
      langBtn.style.boxShadow = "0 4px 0 hsl(220, 5%, 15%)";
      langBtn.style.transform = "translateY(0px)";
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
          <button id="langBtn" onClick={() => showLangMenu()} className="menu__language__icon">
            🌐
          </button>
          <div id="langContainer" className="menu__language__container">
            {langArr.map(lang => (
              <button className="menu__language__container__btn" key={lang.langabb} onClick={() => (setLang(lang.langabb), showLangMenu())}>
                <img className="menu__language__container__btn__icon" src={"./assets/" + lang.langicon} alt="" />
                {lang.langname}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isShown ? <Leaderboard close={handleClick} isFirstRender={isFirstRender} /> : <></>}
    </>
  );
};

export default Menu;
