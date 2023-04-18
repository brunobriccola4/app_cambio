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
      <header className="App-header">
        <p className="title">Currency exchange</p>
      </header>
      <div className="container">
        <p className="text">
          {amount} {from} to {to} - Convert Euros to US Dollars
        </p>
      </div>
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
            <>
              <Stack className="info">
                {amount} {from} = {to} {(amount * data[to]).toFixed(2)}
              </Stack>
              <Stack className="amountReference">
                <p>1 {from} = {(1 * data[to]).toFixed(2)}</p>
              </Stack>
            </>
          )}
          {width > breakpoint && 
            <div className="wrapper">
              <Stack className="containerInfo">
                <p className="textInfo">
                  We use the mid-market rate for our Converter. This is for
                  informational purposes only. You won’t receive this rate when
                  sending money.
                </p>
              </Stack>
            </div>
          }
          <div className="wrapper">
            <Stack className="footer">
              <p>
                <a href="https://www.xe.com/currency/eur-euro/" target="_blank">
                  Euro
                </a>{" "}
                to{" "}
                <a href="https://www.xe.com/currency/usd-us-dollar/">
                  US Dollar
                </a>{" "}
                conversion — Last updated {updated}
              </p>
            </Stack>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
