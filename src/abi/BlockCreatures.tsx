import { ERC20Interface } from "@usedapp/core/src/constants";
import { Falsy } from "@usedapp/core/src/model/types";
import { useContractCall, useContractFunction, useTokenBalance, useEthers } from "@usedapp/core";

import KittyCakeAbi from "./KittyCake.json";
import MoolahAbi from "./moolahAbi.json";
import NFTAbi from "./NFTAbi.json";

import { utils, ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

import { BigNumber } from "@ethersproject/bignumber";
// import { getAddress } from '@ethersproject/address';

// using my account
//	tokenNFT.sol => NFTAbi.json
//		function monstersOwned(address _address) public view returns(uinst256[]);
//		function powerupsOwned(address _address) public view returns(uint256[]);
//		function train(uint256 _id) public nonpayable;
//		function monsters(uint256) public view returns(string rarity, uint256 level, uint256 cooldown, uint256 boost, uint256 boost, uint256 code);
// 	moolahAbi.json
//		function balanceOf(address account) public view returns(uint256);

const tokenMoolah = "0xE51BB42f0F6D01B872cdc7e1764d53b2a81cf0aF";
const interfaceMoolah = new utils.Interface(MoolahAbi);

const tokenNFT = "0x56536c54abB2d2d2512965Af01C98550EDB15EF9";
const interfaceNFT = new utils.Interface(NFTAbi);

export function BalanceOf(address: string | Falsy) {
  const [tokenBalance]: any =
    useContractCall({
      abi: interfaceMoolah,
      address: tokenMoolah,
      method: "balanceOf",
      args: [address]
    }) ?? [];
  return tokenBalance;
}

export function MonstersOwned(address: string | Falsy) {
  const [monsterArray]: any =
    useContractCall({
      abi: interfaceNFT,
      address: tokenNFT,
      method: "monstersOwned",
      args: [address]
    }) ?? [];
  return monsterArray;
}

export function PowerupsOwned() {
  const [tokenBalance]: any =
    useContractCall({
      abi: interfaceNFT,
      address: tokenNFT,
      method: "powerupsOwned",
      args: []
    }) ?? [];
  return tokenBalance;
}

export function Train(_id: string | Falsy) {
  const [tokenBalance]: any =
    useContractCall({
      abi: interfaceNFT,
      address: tokenNFT,
      method: "train",
      args: [_id]
    }) ?? [];
  return tokenBalance;
}

export function Monsters(address: string | Falsy) {
  const t1: any =
    useContractCall({
      abi: interfaceNFT,
      address: tokenNFT,
      method: "monsters",
      args: [address]
    }) ?? [];
  return { t1 };
}

export function TokenURI(address: string | Falsy) {
  const [tokenURI]: any =
    useContractCall({
      abi: interfaceNFT,
      address: tokenNFT,
      method: "tokenURI",
      args: [address]
    }) ?? [];
  return tokenURI;
}

export function GameOwner() {
  const [tokenURI]: any =
    useContractCall({
      abi: interfaceNFT,
      address: tokenNFT,
      method: "gameOwner",
      args: []
    }) ?? [];
  return tokenURI;
}

export function BaseURI() {
  const [baseURI]: any =
    useContractCall({
      abi: interfaceNFT,
      address: tokenNFT,
      method: "baseURI",
      args: []
    }) ?? [];
  return baseURI;
}

export function CooldownBlocks() {
  const [cooldownBlocks]: any =
    useContractCall({
      abi: interfaceNFT,
      address: tokenNFT,
      method: "cooldownBlocks",
      args: []
    }) ?? [];
  return cooldownBlocks;
}

export function CooledOFF(_id: string | Falsy) {
  const [cooledOFF]: any =
    useContractCall({
      abi: interfaceNFT,
      address: tokenNFT,
      method: "cooledOFF",
      args: [_id]
    }) ?? [];
  return cooledOFF;
}

export function OwnerOf(_id: string | Falsy) {
  const [owner]: any =
    useContractCall({
      abi: interfaceNFT,
      address: tokenNFT,
      method: "ownerOf",
      args: [_id]
    }) ?? [];
  return owner;
}
