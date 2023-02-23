import { useEffect } from "react";

const FlagContainer = ({ data, checkTarget }) => {
  useEffect(() => {
    if (data) {
      let elements = Array.from(document.querySelectorAll(".flag"));
      elements.map((elm, i) => {
        setTimeout(() => {
          elm.style.height = "120px";
        }, 100 * i);
      });
    }
  }, [data]);

  return (
    <div className="flagContainer">
      {data.map(country => (
        <img
          className="flag"
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
