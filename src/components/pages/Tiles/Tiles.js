import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";


const Tiles = (props) => {
  const { name, subMenus, iconClassName, onClick, to, exact } = props;
  const [expand, setExpand] = useState(false);

  return (
    <h1>Tiles</h1>
  );
};

export default Tiles;
