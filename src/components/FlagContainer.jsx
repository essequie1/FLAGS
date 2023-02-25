import { useEffect, useContext } from "react";
import langContext from "../context/lang";

import "./FlagContainer.scss";

const FlagContainer = ({ data, checkTarget }) => {
  const { lang, setLang, langData } = useContext(langContext);

  useEffect(() => {
    if (data) {
      let container = document.getElementById("flagContainer");
      let elements = Array.from(document.querySelectorAll(".flagContainer__flag"));
      setTimeout(() => {
        container.style.transform = "translateX(0)";
      }, 100);
      elements.map((elm, i) => {
        setTimeout(() => {
          elm.style.scale = "1";
        }, 100 * i);
      });
    }
  }, [data]);

  return (
    <div id="flagContainer" className="flagContainer">
      {data.map(country => (
        <img
          className="flagContainer__flag"
          key={country.cioc}
          src={country.flags.png}
          alt={"The flag of " + country.name.official}
          onClick={e => {
            switch (lang) {
              case "en":
                checkTarget(country.name.common, e);
                break;
              case "es":
                checkTarget(country.translations.spa.common, e);
                break;
              case "de":
                checkTarget(country.translations.deu.common, e);
                break;
              case "pr":
                checkTarget(country.translations.por.common, e);
                break;
            }
          }}
        />
      ))}
    </div>
  );
};

export default FlagContainer;
