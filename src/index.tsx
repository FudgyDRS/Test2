import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//import { ChainId } from "@usedapp/core";
//import { DAppProvider } from "@usedapp/core";

import { ChainId } from "./constants/chainId";
import { DAppProvider } from "./providers";

import { MoralisProvider } from "react-moralis";

import Footer from "./components/Footer";

/*
 * ChainIds:
 *  BSC:         56
 *  URL:         https://dataseed1.binance.org/
 *  BSC Testnet: 97
 *  URL:         https://testnet.bscscan.com
 *  FTM:         250
 *  URL:         https://ftmscan.com/
 *  FTM Testnet: 0xfa2 === 4002
 *  URL:         https://rpc.testnet.fantom.network/
 *
 *  Need to deploy multicall contract on BSC Testnet and FTM Mainnet
 */

const config = {
  readOnlyChainId: 56
  //readOnlyUrls: {
  //  [ChainId.FTM_Testnet]: "https://rpc.testnet.fantom.network/"
  //}
};

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{}}>
      <MoralisProvider
        appId="eUK744wys4D57Et8dIPpzcDXCc4lLp9mqIKWWXBJ"
        serverUrl="https://wxx9ih2bzamk.usemoralis.com:2053/server"
      >
        <App />
        <div id="react-logo" />
      </MoralisProvider>
    </DAppProvider>
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);
/*
ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId="eUK744wys4D57Et8dIPpzcDXCc4lLp9mqIKWWXBJ"
      serverUrl="https://wxx9ih2bzamk.usemoralis.com:2053/server">
        <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);//*/

export * from "./constants";
export * from "./providers";
export * from "./hooks";
export * from "./model";
export * from "./helpers";
