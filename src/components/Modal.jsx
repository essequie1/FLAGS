import { useState } from "react";
import Leaderboard from "./Leaderboard";
import "./Modal.scss";

const Modal = ({ time, score, refetch, isFirstRender }) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

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
    <dialog className="modal">
      <h2 className="modal__title">COMPLETED</h2>
      <div className="modal__points">
        <p>SCORE</p>
        <span>{score}</span>
      </div>
      <div className="modal__time">
        <p>TIME</p>
        <span>
          {hours !== 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : ""}
          {minutes < 10 ? `0${minutes}:` : `${minutes}:`}
          {seconds < 10 ? `0${seconds}` : `${seconds}`}
        </span>
      </div>
      <div className="modal__score">
        <p>FINAL SCORE</p>
        <span>{score - Math.floor(time / 6000)}</span>
      </div>
      <div className="modal__btnContainer">
        <button className="modal__btn--restart" onClick={refetch}>
          RESTART
        </button>
        <button className="modal__btn--leader" onClick={handleClick}>
          LEADERBOARD
        </button>
      </div>

      {isShown ? <Leaderboard close={handleClick} isFirstRender={isFirstRender} score={score} time={time} /> : <></>}
    </dialog>
  );
};

export default Modal;
