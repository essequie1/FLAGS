import React from "react";

const Menu = ({ startGame }) => {
  return (
    <div>
      <button onClick={startGame}>START</button>
    </div>
  );
};

export default Menu;
