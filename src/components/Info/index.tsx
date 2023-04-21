import { Stack } from "@mui/material";
import React from "react";
import "./index.css";

interface IModalInfo {
  data: any;
  amount: number;
  from: string;
  to: string;
}

const InfoModal: React.FC<IModalInfo> = ({ amount, from, to, data }) => {
  return (
    <div>
      <div className="info">
        {amount} {from} = {to} {(amount * data[to]).toFixed(2)}
      </div>
      <div className="amountReference">
        <p>
          1 {from} = {(1 * data[to]).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default InfoModal;
