import React, { FC } from "react";
import "./index.css";

interface IFooter {
  updated: string;
}
const ModalFooter: FC<IFooter> = ({ updated }) => {
  return (
    <div className="footer">
      <p>
        <a
          href="https://www.xe.com/currency/eur-euro/"
          target="_blank"
          rel="noopener"
        >
          Euro
        </a>{" "}
        to{" "}
        <a href="https://www.xe.com/currency/usd-us-dollar/" rel="noopener">
          US Dollar
        </a>{" "}
        conversion — Last updated {updated}
      </p>
    </div>
  );
};

export default ModalFooter;
