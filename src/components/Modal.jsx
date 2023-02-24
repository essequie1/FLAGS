import { useState } from "react";
import Leaderboard from "./Leaderboard";

const Modal = ({ time, score, refetch, isFirstRender }) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

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
    <dialog className="modal">
      <h2 className="modalTitle">COMPLETED</h2>
      <p className="modalScoreText">SCORE</p>
      <span className="modalScore">{score}</span>
      <p className="modalTimeText">TIME</p>
      <p className="modalTime">
        {hours !== 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : ""}
        {minutes < 10 ? `0${minutes}:` : `${minutes}:`}
        {seconds < 10 ? `0${seconds}` : `${seconds}`}
      </p>
      <p className="modalFinalScoreText">FINAL SCORE</p>
      <span className="modalFinalScore">{score - Math.floor(time / 6000)}</span>
      <button className="modalBtn --restart" onClick={refetch}>
        REPLAY
      </button>
      <button className="modalBtn --leaderboard" onClick={handleClick}>
        LEADERBOARD
      </button>
      {isShown ? <Leaderboard close={handleClick} isFirstRender={isFirstRender} score={score} time={time} /> : <></>}
    </dialog>
  );
};

export default Modal;
