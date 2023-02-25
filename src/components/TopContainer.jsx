import { useContext } from "react";
import langContext from "../context/lang";
import "./TopContainer.scss";

const TopContainer = ({ target }) => {
  const { lang, setLang, langData } = useContext(langContext);

  return (
    <div id="topContainer" className="topContainer">
      <h3 className="topContainer__text">{langData.topContainer.title}</h3>
      <h2 className="topContainer__target">{target}</h2>
    </div>
  );
};

export default TopContainer;
