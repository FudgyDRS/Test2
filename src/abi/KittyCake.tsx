import { ERC20Interface } from "@usedapp/core/src/constants";
import { Falsy } from "@usedapp/core/src/model/types";
import { useContractCall, useContractFunction, useTokenBalance, useEthers } from "@usedapp/core";

import KittyCakeAbi from "../abi/KittyCake.json";

import { utils, ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

const tokenKittyCake = "0xc22e8114818a918260662375450e19ac73d32852";
const interfaceKittyCake = new utils.Interface(KittyCakeAbi);

export function GetTotalDividendsDistributed() {
  //const contractKittyCake = new Contract(tokenKittyCake, interfaceKittyCake)

  const [tokenBalance]: any =
    useContractCall({
      abi: interfaceKittyCake,
      address: tokenKittyCake,
      method: "getTotalDividendsDistributed",
      args: []
    }) ?? [];
  return tokenBalance;
}
