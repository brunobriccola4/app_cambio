import React, { useEffect, useState } from "react";
import "./App.css";
import { ReactComponent as Vector } from "./assets/icons/Vector.svg";
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
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
  const breakpoint = 390;

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

  const handleChangeFrom = (e: SelectChangeEvent<string>): void => {
    setFrom(e.target.value);
  };

  const handleChangeTo = (e: SelectChangeEvent<string>): void => {
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
          <Stack className="stack">
            <div className="inputContainer">
              <label className="aLabel">Amount</label>
              <TextField
                onChange={handleChangeAmount}
                id="outlined-basic"
                variant="outlined"
                value={amount}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                  inputProps: { inputMode: "numeric", pattern: "[0-9]*" },
                }}
                size={"small"}
              />
            </div>
            <div className="inputContainer">
              <FormControl className="inputContainer">
                <label className="aLabel">From</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={from}
                  onChange={handleChangeFrom}
                  variant="outlined"
                  size="small"
                >
                  {Object.keys(data ?? {}).map((x) => (
                    <MenuItem value={x}>{x}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="iconContainer">
              <div className="iconEllipse" onClick={handleClick}>
                <Vector />
              </div>
            </div>
            <div className="inputContainer">
              <FormControl className="inputContainer">
                <label className="aLabel">To</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={to}
                  onChange={handleChangeTo}
                  variant="outlined"
                  size="small"
                >
                  {Object.keys(data ?? {}).map((x) => (
                    <MenuItem value={x}>{x}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Stack>
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
