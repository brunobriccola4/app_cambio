import React from "react";
import "./index.css"

interface IHeader {
    title: string
}

const Header: React.FC<IHeader> = ({title}) => {
  return (
    <header className="App-header">
      <p className="title">{title}</p>
    </header>
  );
};

export default Header;
