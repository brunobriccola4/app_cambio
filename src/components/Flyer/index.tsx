import React from "react";
import { Stack } from "@mui/material";
import './index.css'

const Flyer = () => {
  return (
    <div className="wrapper">
      <div className="containerInfo">
        <p className="textInfo">
          We use the mid-market rate for our Converter. This is for
          informational purposes only. You won’t receive this rate when sending
          money.
        </p>
      </div>
    </div>
  );
};

export default Flyer;
