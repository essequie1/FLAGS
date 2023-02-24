import React, { useState } from "react";
import Leaderboard from "./Leaderboard";

const Menu = ({ startGame, isFirstRender }) => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    if (isShown) {
      let board = document.getElementById("leaderboard");
      board.animate([{ transform: "translate(-50%, -1000px)" }], {
        duration: 300,
        fill: "forwards",
        easing: "cubic-bezier(.35,-0.14,.28,1.36)",
      });
      setTimeout(() => {
        setIsShown(current => !current);
      }, 800);
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
        <h1 className="gameTitle">FLAGS!</h1>
        <button className="startBtn" onClick={startGame}>
          START GAME
        </button>
        <button className="leaderboradBtn" onClick={handleClick}>
          LEADERBOARD
        </button>
      </div>
      {isShown ? <Leaderboard close={handleClick} isFirstRender={isFirstRender} /> : <></>}
    </>
  );
};

export default Menu;
