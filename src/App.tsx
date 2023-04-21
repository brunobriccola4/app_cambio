import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { ReactComponent as Vector } from "./assets/icons/Vector.svg";
import Modal from "./components/Modal";
import useViewport from "./utils/useViewPort";
import Header from "./components/Header";
import ModalFooter from "./components/ModalFooter";
import InfoModal from "./components/Info";
import Flyer from "./components/Flyer";
import Title from "./components/Title";

const url = "https://api.vatcomply.com/rates?base=";

function App() {
  const [amount, setAmount] = useState(1.0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [data, setData] = useState();
  const [updated, setUpdated] = useState("");
  const { width } = useViewport();
  const breakpoint = 690;

  const getData = async () => {
    const res = await fetch(`${url}${from}`).then((res) => res.json());
    const data = res.rates;
    setData(data);
    let date = new Date(res.date).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setUpdated(date);
  };

  useEffect(() => {
    getData();
  }, [from]);

  const handleChangeFrom = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFrom(e.target.value);
  };

  const handleChangeTo = (e: ChangeEvent<HTMLSelectElement>): void => {
    setTo(e.target.value);
  };

  const handleClick = () => {
    const intermedio = from;
    setFrom(to);
    setTo(intermedio);
  };

  const handleChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };

  return (
    <div className="App">
      <Header title={"Currency exchange"} />
      <Title from={from} to={to} amount={amount} />
      <div className="paperContainer">
        <Modal>
          <div className="stack">
            <div className="inputContainer">
              <label className="aLabel">Amount</label>
              <input
                value={amount}
                onChange={handleChangeAmount}
                className="aInput"
              />
            </div>
            <div className="inputContainer">
              <label className="aLabel">From</label>
              <select onChange={handleChangeFrom} value={from} className="aInput">
                {Object.keys(data ?? {}).map((selected) => (
                  <option value={selected}>{selected}</option>
                ))}
              </select>
            </div>
            <div className="iconContainer">
              <div className="iconEllipse" onClick={handleClick}>
                <Vector />
              </div>
            </div>
            <div className="inputContainer">
              <label className="aLabel">To</label>
              <select onChange={handleChangeTo} value={to} className="aInput">
                {Object.keys(data ?? {}).map((x) => (
                  <option value={x}>{x}</option>
                ))}
              </select>
            </div>
          </div>
          {data && (
            <InfoModal amount={amount} data={data} from={from} to={to} />
          )}
          {width > breakpoint && <Flyer />}
          <div className="wrapper">
            <ModalFooter updated={updated} />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
