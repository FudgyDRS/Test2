import React, { FC } from "react";
import { Text, Button } from "@chakra-ui/react";
import styled from "styled-components";

import { ethers } from "ethers";
import { formatEther, parseUnits, formatUnits } from "@ethersproject/units";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { useEtherBalance, useTokenBalance, useEthers } from "@usedapp/core";

const Stake: FC = () => {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);

  return (
    <>
      <div className="Stake">Farm/ stake</div>
      <div>$BNB Balance: {etherBalance && formatEther(etherBalance)} </div>
      <br></br>
    </>
  );
};

export default Stake;

// Header:
//  Tokens Held
//  BNB Held
//  Estimated balance
// Body:
//  Have a list of high volume tokens, pie charts of investments
//  Advert
//  Needs to list vertical rows indicating: symbol, image?, PCS price, supply, MCap, Liquidity, decimals, balance, balance_units
//  Tracked wallets

// Seperate Issues:
//  Charting tools
//  Voting tools
//  Sweepwidget clone
//  NFT Minting
//  NFT Marketplace
//  NFT Game
