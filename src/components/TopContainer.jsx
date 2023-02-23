const TopContainer = ({ target }) => {
  return (
    <div id="topContainer" className="topContainer">
      <div className="targetContainer">
        <h3 className="targetText">Find the flag of: </h3>
        <h2 className="target">{target}</h2>
      </div>
    </div>
  );
};

export default TopContainer;
