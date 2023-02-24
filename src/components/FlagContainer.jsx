import { useEffect } from "react";
import "./FlagContainer.scss";

const FlagContainer = ({ data, checkTarget }) => {
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
            checkTarget(country.name.official, e);
          }}
        />
      ))}
    </div>
  );
};

export default FlagContainer;
