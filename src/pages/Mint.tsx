import React, { FC } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import styled from "styled-components";

import { ethers } from "ethers";
import { formatEther, parseUnits, formatUnits } from "@ethersproject/units";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

//import { useEthers } from "@usedapp/core";
//import { useEtherBalance } from "@usedapp/core";
//import { useTokenBalance } from "@usedapp/core";

import { useEthers } from "../hooks/useEthers";
import { useEtherBalance } from "../hooks/useEtherBalance";
import { useTokenBalance } from "../hooks/useTokenBalance";

import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import MintButton from "../components/MintButton";
import "@fontsource/inter";

export interface ThemeProps {
  background: string;
  text: string;
}

const MintDefault = styled.div`
  color: white;
  background-color: black;
  width: 100vw;
  height: 100vh;
`;

const MintButtonBox = styled.div`
  flexDirection="column"
  align-items: center;
  height: 5rem;
  padding-right: 2rem;
`;

const Mint: FC = () => {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);

  return (
    <>
      <MintDefault>
        <div className="Mint">Mint</div>
        <div>$BNB Balance: {etherBalance && formatEther(etherBalance)} </div>
        <br></br>
        <MintButtonBox>
          <ChakraProvider theme={theme}>
            <MintButton handleMintModal={account} />
          </ChakraProvider>
        </MintButtonBox>
      </MintDefault>
    </>
  );
};

export default Mint;

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
