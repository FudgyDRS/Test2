import React, { FC } from "react";
import { Text, Button } from "@chakra-ui/react";
import styled from "styled-components";

import { ethers } from "ethers";
import { formatEther, parseUnits, formatUnits } from "@ethersproject/units";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { useEtherBalance, useTokenBalance, useEthers } from "@usedapp/core";

import { GetTotalDividendsDistributed } from "../abi/KittyCake";
import {
  BalanceOf,
  MonstersOwned,
  PowerupsOwned,
  Train,
  Monsters,
  TokenURI,
  GameOwner,
  BaseURI,
  CooldownBlocks,
  CooledOFF,
  OwnerOf
} from "../abi/BlockCreatures";

import { MonsterObject } from "../models/MonsterObject";

const BlockCreatures = styled.span`
  color: green;
`;

type MonsterObjectProps = {
  monsterObject: MonsterObject;
};

const ListMonsters: FC<MonsterObjectProps> = ({ monsterObject }) => {
  const [subnav, setSubnav] = React.useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return <></>;
};

const Overview: FC = () => {
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);

  const TrainMonster0 = () => {
    const monster = "0x23AE";
    Train(monster);
  };

  // Network tokens
  const tokenWBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  const tokenBUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

  // Test BSC Contracts
  //		MeowMoon
  const tokenMeowMoon = "0x1970e6047bcbca6c78b57b6e0b1006abe629a630";
  const myBalance = useTokenBalance(tokenMeowMoon, account);
  const randoAccount = "0xd0de77a730383499ff1ac931151ac6097ac09f8c";
  const randoBalance = useTokenBalance(tokenMeowMoon, randoAccount);

  //		KittyCake
  const tokenKittyCake = "0xc22e8114818a918260662375450e19ac73d32852";
  const randoAccount2 = "0x9a372e6797919473b5751b8853c7f46ef9e07615";
  const rando2Balance = useTokenBalance(tokenKittyCake, randoAccount2);
  //const contractKittyCake = new Contract(tokenKittyCake, interfaceKittyCake) // so far does nothing
  const contractDividends = GetTotalDividendsDistributed();

  //		Block Creatures
  //const moolahAddress = "0xE51BB42f0F6D01B872cdc7e1764d53b2a81cf0aF";
  //const myMoolahBalance = useTokenBalance(moolahAddress, account);

  //const NFTAddress = "0x56536c54abB2d2d2512965Af01C98550EDB15EF9";
  // function monsters(uint256) public view returns(string rarity, uint256 level, uint256 cooldown, uint256 boost, uint256 code);
  const _id = "0x1F93";
  const balanceMoolah = BalanceOf(account);
  const monsterAddresses = MonstersOwned(account);
  //const monster0 = monsterAddresses == [] ? monsterAddresses[0] : ""; // needs to be made asynch
  //const testMonster = BaseURI();
  //const cooldownBlocks = CooledOFF(_id);
  console.log("Monsters Owned: ");
  console.log(MonstersOwned(account));
  console.log("Monster Data: ");
  console.log(Monsters(_id));
  console.log("Game Owner: ");
  console.log(GameOwner());
  console.log("Monster Owner: ");
  console.log(OwnerOf(_id));
  //console.log(testMonster)
  //console.log(cooldownBlocks);

  return (
    <>
      <div className="overview">Overview</div>
      <div>$BNB Balance: {etherBalance && formatEther(etherBalance)} </div>
      <div>$MeowMoon Balance: {myBalance && formatUnits(myBalance, 9)}</div>
      <div>$MeowMoon Rando Balance: {randoBalance && formatUnits(randoBalance, 9)}</div>
      <div>$KittyCake Rando Balance: {rando2Balance && formatUnits(rando2Balance, 18)}</div>
      <div>$KittyCake Total Payout: {contractDividends && formatEther(contractDividends)}</div>
      <br></br>
      <BlockCreatures>
        <div>
          $Moolah Balance via 'balanceOf': {balanceMoolah && formatUnits(balanceMoolah, 18)}
        </div>
        <div>$Moolah NFT List by address: {}</div>
      </BlockCreatures>
      <Button colorScheme="blue" onClick={TrainMonster0}>
        Button
      </Button>
    </>
  );
};
//<div>$KittyCake Total Payout: {totalDividends && formatUnits(totalDividends, 18)}</div>
export default Overview;
/*
let provider;
window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum));
const signer = provider.getSigner();
const decimals = 10 ** 18;

async function connect() {
	console.log("Button Pressed")
	await ethereum.request({ method: 'eth_requestAccounts' });
	getAccount();

}

async function getAccount() {
	const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	const _account = accounts[0];
	//console.log("Wallet connected to: ", _account)
	if (accounts != 0) {
		document.getElementById("connect").innerText = "CONNECTED";
	}
}


const moolahContract = new ethers.Contract(moolahAddress, moolahAbi, provider);
const moolahSign = moolahContract.connect(signer);

const NFTContract = new ethers.Contract(NFTAddress, NFTAbi, provider);
const NFTSign = NFTContract.connect(signer);


////////////////////////
//UNIVERSAL
////////////////////////
async function upper_bar() {
	myAddress = await signer.getAddress();
	_balance = await moolahContract.balanceOf(myAddress);
	balance = parseInt(_balance._hex)/decimals
	document.getElementById("balance").innerText = "WALLET: " + balance.toPrecision(6);


}


////////////////////////
//MINT NFTS
////////////////////////
async function fetchData(_id) {
	let creepURI = await NFTContract.tokenURI(_id);
	//console.log('Fetching URI');
	return _data = $.getJSON(creepURI+'.json', function(json) {
		//console.log('Fetching JSON');
	});

}

async function fetch_monsters(address){
	window.post = function(url, data) {
	  return fetch(url, {method: "POST", body: data});
	}
	return response = (await post("https://www.blockcreatures.co/address", address)).json()
	// return response = (await post("http://127.0.0.1:5000//address", address)).json()

}

async function fetch_creatures() {
	myAddress = await signer.getAddress();
	//let res = await NFTContract.monstersOwned(myAddress);
	//console.log(res)

	let res = await fetch_monsters(myAddress);
	//console.log(res)
	let monsters = []
	for (let i = 0; i < res.length; i++) {
		if (res[i]['code'] <= 7) {
			monsters.push(res[i]['id'])
		}
	}

	const _length = monsters.length;
	let _num = 1;
	let _nonce = 0;
	let _block = await provider.getBlockNumber();
	let _cooldown =  await NFTContract.cooldownBlocks()
	//loop through _length times and update cards
	for (let i = 0; i <= (Number(_length) - 1); i++) {
		let _id = monsters[_nonce];
		let owner = await NFTContract.ownerOf(_id);

		if (owner === myAddress) {

			let creepImage = await fetchData(_id);
			document.getElementById("creature" + _num).src = creepImage['image'];
			//Update Monster Data
			let creepData = await NFTContract.monsters((_id));
			let rarity = creepData['rarity'];
			let image = document.getElementById("creature" + _num);
			document.getElementById("rarity" + _num).innerText = "RARITY: " + (creepData['rarity']).toUpperCase();
			document.getElementById("id" + _num).innerText = "ID: " + (_id);
			document.getElementById("level" + _num).innerText = "LEVEL : " + creepData['level'];
			document.getElementById("boost" + _num).innerText = "BOOST : " + creepData['boost'];
			document.getElementById("experience" + _num).innerText = "EXPERIENCE : " + creepData['experience'];
			document.getElementById("experience2Level" + _num).innerText = "EXP NEEDED T0 LEVEL : " + ((creepData['level']  * await NFTContract.experienceModifier()) + 1);
			document.getElementById("rewards" + _num).innerText = "$MOOLAH RATE : " + ((creepData['level'] * creepData['boost']) * ((await NFTContract.farmReward())/decimals)).toFixed(5);

			//Check if Monster on Cooldown
			let cooldown = await NFTContract.cooledOFF(_id);

			if (cooldown === true) {
				document.getElementById("active" + _num).innerText = "READY TO TRAIN";
				document.getElementById("active" + _num).style.color = '#7EFF5B';
			}
			else {
				//calculate next training
				let cooldown_time = (((parseInt(_cooldown._hex) + parseInt(creepData['cooldown']._hex)) - _block) * 3) / 60;

				document.getElementById("active" + _num).innerText = "ON COOLDOWN FOR " + cooldown_time + " MIN";
				document.getElementById("active" + _num).style.color = 'red';
			}
			//Seek to Next Holder
			_num +=1
			_nonce +=1

		}
		else {
			_nonce += 1
		}





	}

}


////////////////////////
//BUTTONS
////////////////////////
async function fetchLogs() {
	let topic = ethers.utils.id("Train(uint256,string,uint256)");
	let targetBlock = await provider.getBlockNumber();
	const logs = provider.getLogs({
		address: NFTAddress,
		fromBlock: targetBlock - 10,
		toBlock: 'latest',
		topics: [ topic ]
	});

	return logs
 }

async function train(_id) {
	let id = document.getElementById("id" + _id).innerText;
	id = id.replace("ID: ",'');
	let creepData = await NFTContract.monsters((id));
	let _rate = ((creepData['level'] * creepData['boost']) * ((await NFTContract.farmReward())/decimals)).toFixed(5);
	let _train = await NFTSign.train(id, {gasLimit: 150000});
	document.getElementById("creature" + _id).src = "/static/img/hourglass.gif";
	let reciept = await provider.waitForTransaction(_train['hash'], 3);

	//ADD WAIT FOR TX THEN POPUP RESULTS
	document.getElementById("creature" + _id).src = "/static/img/hourglass.gif";
	let events = await NFTContract.interface.parseLog(reciept['logs']['3']).args;
	console.log(events)
	let result = events['result'];
	document.getElementById("creature" + _id).src = "/static/img/hourglass.gif";
	let base = await NFTContract.farmReward()/decimals

	console.log(result)

	if (result==='lose') {
		alert("Oh no! Your monster completed its training, however was injured...Keep your chin up, you still gained 2 EXP & " + base + " $MOOLAH this session.");
	}
	else {
		alert("Congratulations, your monster completed its training and has gained full experience & " + _rate  + "$ MOOLAH Rewards!");
	}

}
async function burn(_id) {
	let id = document.getElementById("id" + _id).innerText;
	id = id.replace("ID: ",'');
	alert("Are you sure you want to burn creature " + id);
	await NFTSign.burnCreature(id);
}


async function reload() {
	upper_bar()
	fetch_creatures()
	getAccount()

}

reload()
setInterval(reload, 10000);
//*/
