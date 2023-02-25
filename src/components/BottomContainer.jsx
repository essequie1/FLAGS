import { useContext } from "react";
import langContext from "../context/lang";
import "./BottomContainer.scss";

const BottomContainer = ({ time, score }) => {
  const { lang, setLang, langData } = useContext(langContext);

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return (
    <div id="bottomContainer" className="bottomContainer">
      <div className="bottomContainer__timer">
        <h4 className="bottomContainer__timer__title">{langData.bottomContainer.timer}</h4>
        <p className="bottomContainer__timer__time">
          {hours !== 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : ""}
          {minutes < 10 ? `0${minutes}:` : `${minutes}:`}
          {seconds < 10 ? `0${seconds}` : `${seconds}`}
        </p>
      </div>
      <div className="bottomContainer__score">
        <h4 className="bottomContainer__score__title">{langData.bottomContainer.points}</h4>
        <p className="bottomContainer__score__points">{score}</p>
      </div>
    </div>
  );
};

export default BottomContainer;
