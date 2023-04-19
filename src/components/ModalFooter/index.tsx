import { Stack } from "@mui/material";
import React, { FC } from "react";
import './index.css'

interface IFooter {
  updated: string;
}
const ModalFooter: FC<IFooter> = ({updated}) => {
  return (
    <Stack className="footer">
      <p>
        <a href="https://www.xe.com/currency/eur-euro/" target="_blank" rel="noopener">
          Euro
        </a>{" "}
        to <a href="https://www.xe.com/currency/usd-us-dollar/" rel="noopener">US Dollar</a>{" "}
        conversion — Last updated {updated}
      </p>
    </Stack>
  );
};

export default ModalFooter;
