import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainId, DAppProvider } from "@usedapp/core";

const config = {
  readOnlyChainId: ChainId.BSC,
  readOnlyUrls: {
    [ChainId.Mainnet]: "https://dataseed1.binance.org/"
  }
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{}}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
