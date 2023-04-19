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
      <Stack className="info">
        {amount} {from} = {to} {(amount * data[to]).toFixed(2)}
      </Stack>
      <Stack className="amountReference">
        <p>
          1 {from} = {(1 * data[to]).toFixed(2)}
        </p>
      </Stack>
    </div>
  );
};

export default InfoModal;
