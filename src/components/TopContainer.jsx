import "./TopContainer.scss";

const TopContainer = ({ target }) => {
  return (
    <div id="topContainer" className="topContainer">
      <h3 className="topContainer__text">Find the flag of: </h3>
      <h2 className="topContainer__target">{target}</h2>
    </div>
  );
};

export default TopContainer;
