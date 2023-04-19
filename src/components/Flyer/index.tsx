import React from "react";
import { Stack } from "@mui/material";
import './index.css'

const Flyer = () => {
  return (
    <div className="wrapper">
      <Stack className="containerInfo">
        <p className="textInfo">
          We use the mid-market rate for our Converter. This is for
          informational purposes only. You won’t receive this rate when sending
          money.
        </p>
      </Stack>
    </div>
  );
};

export default Flyer;
