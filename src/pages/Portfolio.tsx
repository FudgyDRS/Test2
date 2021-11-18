import React, { FC, useState } from "react";
import { Text, Box, Button, VStack, Center, keyframes, Image, Input } from "@chakra-ui/react";
import styled from "styled-components";

import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column } from "react-table";

import { ethers, providers } from "ethers";
import { formatUnits } from "@ethersproject/units";
import { useEtherBalance, useEthers } from "@usedapp/core";

import { useMoralis } from "react-moralis";

import moolahAbi from "../abi/moolahAbi.json";
import pancakeswapV2 from "../abi/PancakeswapV2.json";
import pancakeswapV2Pair from "../abi/PancakeswapV2Pair.json";
import WBNBABI from "../abi/WBNBABI.json";

import { keccak256 } from "@ethersproject/keccak256";

import { GridLoader } from "react-spinners";

import { BLACKLISTED_ADDRESSES } from "../constants";

const PortfolioDefault = styled.div`
  width: 100vw;
`;

const spin = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg)}
`;

export interface tokensExisting {
  token_address: string;
  name: string;
  symbol: string;
  logo?: string;
  thumbnail?: string | undefined;
  decimals: string;
  balance: string;
}

export interface tokenData {
  token_address: string;
  name: string;
  symbol: string;
  logo?: string | undefined;
  thumbnail?: string | undefined;
  decimals: string;
  balance: string;
  mcap: string;
  WBNBPrice: string;
  accountValue: string;
  totalSupply: string;
  pairTokens: string;
  pairLiquidity: string;
}

function ParseNumber(num: number): string {
  var v = String(Math.trunc(num));
  const l = v.length;
  if (l > 21) v = v.charAt(0) + "." + v.substring(1, 2) + "E" + String(l - 1);
  else if (l == 21) v = v.substring(0, 2) + "." + v.substring(3, 5) + "QT";
  else if (l == 20) v = v.substring(0, 1) + "." + v.substring(2, 4) + "QT";
  else if (l == 19) v = v.charAt(0) + "." + v.substring(1, 3) + "QT";
  else if (l == 18) v = v.substring(0, 2) + "." + v.substring(3, 5) + "Q";
  else if (l == 17) v = v.substring(0, 1) + "." + v.substring(2, 4) + "Q";
  else if (l == 16) v = v.charAt(0) + "." + v.substring(1, 3) + "Q";
  else if (l == 15) v = v.substring(0, 2) + "." + v.substring(3, 5) + "T";
  else if (l == 14) v = v.substring(0, 1) + "." + v.substring(2, 4) + "T";
  else if (l == 13) v = v.charAt(0) + "." + v.substring(1, 3) + "T";
  else if (l == 12) v = v.substring(0, 2) + "." + v.substring(3, 5) + "B";
  else if (l == 11) v = v.substring(0, 1) + "." + v.substring(2, 4) + "B";
  else if (l == 10) v = v.charAt(0) + "." + v.substring(1, 3) + "B";
  else if (l == 9) v = v.substring(0, 2) + "." + v.substring(3, 5) + "M";
  else if (l == 8) v = v.substring(0, 1) + "." + v.substring(2, 4) + "M";
  else if (l == 7) v = v.charAt(0) + "." + v.substring(1, 3) + "M";
  else if (l == 6) v = v.substring(0, 2) + "." + v.substring(3, 5) + "K";
  else if (l == 5) v = v.substring(0, 1) + "." + v.substring(2, 4) + "K";
  else if (l == 4) v = v.charAt(0) + "." + v.substring(1, 3) + "K";
  else v = String(num.toFixed(4));
  return v;
}

async function ReloadData(
  myAddress: string | null | undefined,
  signer: ethers.providers.JsonRpcSigner,
  Moralis: any
) {
  // First detach old screen table, and splash load scren until finished
  // splash load but overlay in heiherchy
  // get monkey and make it spin same as react logo + animated loading text
  console.log(myAddress, "\n", typeof myAddress);

  var loading = document.getElementById("isLoading");
  if (loading) loading.hidden = false;
  const WBNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
  var tokenData: tokenData[] = [];
  var tbody = document.createElement(`tbody`);
  tbody.id = "table-data";
  tbody.className = "css-0";
  document.getElementById("table-data")?.replaceWith(tbody);

  var tr = document.createElement(`tr`);
  tr.className = "css-0";

  var td = document.createElement(`tr`);
  tr.className = "css-0";
  //<tbody role="rowgroup" id="table-data" class="css-0">
  //<tr role="row" class="css-0">
  //<td role="cell" class="css-0">Hello2</td><td role="cell" class="css-0">World</td><td role="cell" class="css-0">World</td><td role="cell" class="css-0">World</td><td role="cell" class="css-0">World</td><td role="cell" class="css-0">World</td><td role="cell" class="css-0">World</td></tr></tbody>

  Moralis.start({
    appId: "eUK744wys4D57Et8dIPpzcDXCc4lLp9mqIKWWXBJ",
    serverUrl: "https://wxx9ih2bzamk.usemoralis.com:2053/server"
  });
  const WBNBPrice = await Moralis.Web3API.token.getTokenPrice({ chain: "bsc", address: WBNB });
  await Moralis.Web3API.account
    .getTokenBalances({ chain: "bsc", address: myAddress })
    .then((result: any) => {
      let test: tokensExisting[] = result;
      for (let token of test) {
        if (!BLACKLISTED_ADDRESSES.includes(token.token_address))
          ReloadScreenData(token, myAddress, signer, WBNBPrice.usdPrice);
      }
    });
  // deload splash loading screen
  if (loading) loading.hidden = true;
}

async function ReloadScreenData(
  token: tokensExisting,
  myAddress: string | null | undefined,
  signer: ethers.providers.JsonRpcSigner,
  WBNBPrice: number | string
) {
  const WBNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
  const WBNBContract = new ethers.Contract(WBNB, WBNBABI, signer);

  const pcsV2Factory = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
  const pcsV2FactoryContract = new ethers.Contract(pcsV2Factory, pancakeswapV2, signer);

  const accountTokens = formatUnits(token.balance, token.decimals);

  var tokenData: tokenData;

  var contractContract = new ethers.Contract(token.token_address, moolahAbi, signer);
  await contractContract.functions
    .totalSupply()
    .then((result) => {
      var totalSupply = formatUnits(result[0], token.decimals);

      pcsV2FactoryContract.functions
        .getPair(token.token_address, WBNB)
        .then((result) => {
          var pairAddress = result[0];
          var pairContract = new ethers.Contract(pairAddress, pancakeswapV2Pair, signer);
          pairContract.functions
            .getReserves()
            .then((result) => {
              // since decimals for result[0] and result[1] are unknown
              // if contractAddress > WBNB then result[0] decimals = 18 & result[1]; decimals = token.decimals
              // else                           result[1] decimals = 18 & result[0]; decimals = token.decimals
              var tokens2 = sortTokens(token.token_address, WBNB);
              let pairTokens, pairLiquidity;
              if (tokens2[0] == WBNB) {
                pairTokens = formatUnits(result[1], token.decimals);
                pairLiquidity = formatUnits(result[0], 18);
              } else {
                pairTokens = formatUnits(result[0], token.decimals);
                pairLiquidity = formatUnits(result[1], 18);
              }
              var mCap =
                (Number(totalSupply) / Number(pairTokens)) *
                Number(pairLiquidity) *
                Number(WBNBPrice);
              var accountValue =
                (Number(accountTokens) / Number(pairTokens)) * Number(pairLiquidity);
              var tokenPrice = (1 / Number(pairTokens)) * Number(pairLiquidity);
              accountValue =
                (accountValue > Number(pairLiquidity)
                  ? (Number(accountTokens) / Number(totalSupply)) * Number(pairLiquidity)
                  : accountValue) * Number(WBNBPrice);

              console.log(
                "Token Name: ",
                token.name,
                "\nToken address: ",
                token.token_address,
                "\nMCap: ",
                mCap,
                "\nWBNB Price: ",
                WBNBPrice,
                "\nAccount Value: ",
                accountValue,
                "\nTotal Supply: ",
                totalSupply,
                "\nPair Tokens: ",
                pairTokens,
                "\nPair Liquidity: ",
                pairLiquidity,
                "\nAccount Tokens: ",
                accountTokens
              );
              tokenData = {
                token_address: token.token_address,
                name: token.name,
                symbol: token.symbol,
                logo: token.logo,
                thumbnail: token.thumbnail,
                decimals: token.decimals,
                balance: token.balance,
                mcap: String(mCap),
                WBNBPrice: String(WBNBPrice),
                accountValue: String(accountValue),
                totalSupply: totalSupply,
                pairTokens: pairTokens,
                pairLiquidity: pairLiquidity
              };

              if (Number(pairTokens) != 0 || Number(pairLiquidity) != 0) {
                var tbody = document.getElementById("table-data");
                var tr = document.createElement(`tr`);
                tr.className = "css-0";

                var td1 = document.createElement(`td`);
                td1.className = "css-0";
                td1.textContent = token.token_address;
                tr.appendChild(td1);
                tbody?.appendChild(tr);

                var td2 = document.createElement(`td`);
                td2.className = "css-0";
                td2.textContent = token.name;
                tr.appendChild(td2);
                tbody?.appendChild(tr);

                var td3 = document.createElement(`td`);
                td3.className = "css-0";
                td3.textContent = "$" + ParseNumber(tokenPrice); //String(tokenPrice);
                tr.appendChild(td3);
                tbody?.appendChild(tr);

                var temp = String(Number(totalSupply));
                var td4 = document.createElement(`td`);
                td4.className = "css-0";
                td4.textContent = temp.includes("e") ? temp : ParseNumber(Number(totalSupply)); //String(parseInt(totalSupply));
                tr.appendChild(td4);
                tbody?.appendChild(tr);

                var td5 = document.createElement(`td`);
                td5.className = "css-0";
                td5.textContent = "$" + ParseNumber(mCap); //String(mCap);
                tr.appendChild(td5);
                tbody?.appendChild(tr);

                var td6 = document.createElement(`td`);
                td6.className = "css-0";
                td6.textContent = ParseNumber(Number(accountTokens)); //String(accountTokens);
                tr.appendChild(td6);
                tbody?.appendChild(tr);

                var td7 = document.createElement(`td`);
                td7.className = "css-0";
                td7.textContent = "$" + ParseNumber(accountValue); //String(accountValue);
                tr.appendChild(td7);
                tbody?.appendChild(tr);
              }
            })
            .catch((error) => {
              console.log(
                "Token missing liquidity! \n(Note: Apefolio currently only supports WBNB pancakeswapV2 pairs)"
              );
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("Token missing WBNB pancakeswapV2 pair");
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    }); // API makes this impossible
}

//export function keccak256(data: BytesLike): string {
//  return '0x' + sha3.keccak_256(arrayify(data));
//}
// returns sorted token addresses, used to handle return values from pairs sorted in this order
function sortTokens(tokenA: string, tokenB: string): string[2] {
  const tokens: any[2] = tokenA != tokenB && tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA];
  return tokens[0] != "0x0000000000000000000000000000000000000000" && tokens;
}

// From: https://bscscan.com/address/0x05ff2b0db69458a0750badebc4f9e13add608c7f#code
// calculates the CREATE2 address for a pair without making any external calls
function pairFor(factory: string, tokenA: string, tokenB: string): string {
  const tokens: any[2] = sortTokens(tokenA, tokenB);
  const tokens2 = keccak256(tokens[0] + tokens[1].substring(2));
  const tokens3 =
    "0x00000000000000000000000000000000000000ff" +
    factory.substring(2) +
    keccak256(tokens2).substring(2) +
    "d0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66";
  console.log(tokens3);
  const pair = keccak256(tokens3);
  console.log(pair);
  return pair.substring(0, 42);
}

/*
const printTokensExisting: FC = () => {
  const { Moralis, isInitialized, authenticate, user } = useMoralis();
  Moralis.start({appId: "eUK744wys4D57Et8dIPpzcDXCc4lLp9mqIKWWXBJ", serverUrl: "https://wxx9ih2bzamk.usemoralis.com:2053/server"});
    Moralis.Web3API.account.getTokenBalances({chain: 'bsc', address: "0x1C77905fEAfD85f7fdeD7aD5f871F93C2B11dcfF"}).then(result => {
      var screenData = "";
      for(var token of result) {
        tokens.push({
          token_address: token.token_address, 
          name: token.name,
          symbol: token.symbol,
          logo: token.logo,
          thumbnail: token.thumbnail,
          decimals: token.decimals,
          balance: token.balance
        });
        screenData += token.token_address + " " + token.name + " " + token.symbol + " " + token.logo + " " + token.thumbnail + " " + token.decimals + " " + token.balance + "\n";
      }
      //console.log(tokens);
      return(
        <Text color="white" fontSize="md">{screenData}</Text>
      );
    }
    );


  //var result = "";
  //for(var token of tokens) {
  //  result += token.token_address + " " + token.name + " " + token.symbol + " " + token.logo + " " + token.thumbnail + " " + token.decimals + " " + token.balance + "\n";
  //}
  //console.log(result);
  return(
    <Text color="white" fontSize="md">error</Text>
  );
}
*/
export type TableVariable = {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
};

const Portfolio: FC = () => {
  const [input, setInput] = useState("");

  // pass table row as state....tf?
  const [dataTable, setDataTable] = useState();

  var data2 = [
    {
      col1: "Hello2",
      col2: "World",
      col3: "World",
      col4: "World",
      col5: "World",
      col6: "World",
      col7: "World"
    },
    {
      col1: "Hello3",
      col2: "World4",
      col3: "World4",
      col4: "World4",
      col5: "World4",
      col6: "World4",
      col7: "World4"
    }
  ];
  var data = React.useMemo(() => data2, []);
  //var data = data2;
  //const data: readonly { col1: string; col2: string; col3: string; col4: string; col5: string; col6: string; col7: string; }[] = data2;

  const columns: Array<
    Column<{
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
      col6: string;
      col7: string;
    }>
  > = React.useMemo(
    () => [
      { Header: "", accessor: "col1" },
      { Header: "TKN", accessor: "col2" },
      { Header: "Price", accessor: "col3" },
      { Header: "Supply", accessor: "col4" },
      { Header: "MCap", accessor: "col5" },
      { Header: "Balance", accessor: "col6" },
      { Header: "Wallet", accessor: "col7" }
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  );

  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const { Moralis } = useMoralis();
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  //var data;
  let tokens: tokensExisting[] = [];
  var myAddress = "0x1C77905fEAfD85f7fdeD7aD5f871F93C2B11dcfF";
  const WBNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
  const WBNBContract = new ethers.Contract(WBNB, WBNBABI, signer);

  // all data from pcsV1Factory was migrated, supposedly
  // try/catch if promise successes, tested with bad pair
  const pcsV2Factory = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
  const pcsV2FactoryContract = new ethers.Contract(pcsV2Factory, pancakeswapV2, signer);

  data2 = [
    {
      col1: "Hello2",
      col2: "World",
      col3: "World",
      col4: "World",
      col5: "World",
      col6: "World",
      col7: "World"
    },
    {
      col1: "Hello3",
      col2: "World4",
      col3: "World4",
      col4: "World4",
      col5: "World4",
      col6: "World4",
      col7: "World4"
    },
    {
      col1: "Hello6",
      col2: "World6",
      col3: "World2",
      col4: "World2",
      col5: "World2",
      col6: "World2",
      col7: "World2"
    }
  ];

  /*
    
    contractContract.balanceOf(pairAddress).then(
      (result: BigNumber) => {
        console.log("contractContract.balanceOf(pairAddress)");
        const pairTokens = result;
        WBNBContract.balanceOf(pairAddress).then(
          (result: BigNumber) => {
            const pairLiquidity = result;

        });
      });
  */
  // 0x1C77905fEAfD85f7fdeD7aD5f871F93C2B11dcfF

  const spinAnimation = `${spin} infinite 2s linear`;

  return (
    <>
      <Box>
        <Text color="white">Apefolio v0.0.01a</Text>
        <Text color="red">This build of the Apefolio portfolio tool is an alpha version.</Text>
        <br></br>
        <Text color="white">
          This tool fetches data directly from every relevant contract rather than parsing
          transaction history.
        </Text>
        <Text color="white">Thus, making it more accurate than even BSCSCAN.com</Text>
        <br></br>
        <Text color="white">
          To begin, connect ANY BSC wallet (this is used to make the EIP request), then search any
          valid address and wait for the return results to render.
        </Text>
        <Text color="white">(Note1: data will also post your console log)</Text>
        <Text color="white">
          (Note2: blacklisted addresses are skipped, for now report scam addresses directly to us)
        </Text>
        <br></br>
        <Input
          placeholder="  target address..."
          marginLeft="5px"
          width="500px"
          value={input}
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
        />
        <Button
          bg="gray.800"
          color="red"
          border="1px solid transparent"
          _hover={{ border: "1px", borderStyle: "solid", backgroundColor: "gray.700" }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
          width="140px"
          onClick={() => ReloadData(input, signer, Moralis)}
        >
          Reload Data
        </Button>
        <Text>Test Address0: 0x1C77905fEAfD85f7fdeD7aD5f871F93C2B11dcfF</Text>
        <Text>Test Address1: 0x2ACE52107F0fA44af03e8b6bf75b8C2A72d69cff</Text>
      </Box>
      <Box
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px"
          },
          "&::-webkit-scrollbar-track": {
            width: "6px"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#282c34"
          }
        }}
        width="100vw"
        float="left"
        height="calc(74vh - 80px)"
      >
        <PortfolioDefault>
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup: any) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      isNumeric={column.isNumeric}
                    >
                      {column.render("Header")}
                      <chakra.span pl="4">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()} id="table-data">
              {rows.map((row: any) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => (
                      <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                        {cell.render("Cell")}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Center>
            <Box width="180px" background="black" hidden={true} id="isLoading">
              <VStack spacing={10} aligh="center">
                <Box animation={spinAnimation}>
                  <Image src={require("../asset/image/ApeLogo.png").default} boxSize="150px" />
                </Box>
              </VStack>
              <Text color="red" align="center">
                L O A D I N G
              </Text>
              <GridLoader color="red" />
            </Box>
          </Center>
        </PortfolioDefault>
      </Box>
    </>
  );
};

export default Portfolio;

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

// Problems:
//  Inputed data loaded in raw html (cannot manipulate with sorting or onclick)
//  loading data animation does not wait until render
//  chakra buttons overlay sidebar
//  add wbnb
//  ipfs routing
//  list current wallet
//  button to connect to bscscan.com/address
//  button to copy address

//  create contract
//    tokens held buy address
//    iterate through tokens
//    return token data
