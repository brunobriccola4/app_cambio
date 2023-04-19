import React from "react";
import "./index.css"

interface ITitle {
  from: string;
  to: string;
  amount: number;
}
const Title: React.FC<ITitle> = ({ amount, from, to }) => {
  return (
    <div className="container">
      <p className="text">
        {amount} {from} to {to} - Convert Euros to US Dollars
      </p>
    </div>
  );
};

export default Title;
