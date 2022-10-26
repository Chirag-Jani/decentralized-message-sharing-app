import web3 from "./Web3";

// const Contract = require("./build/Contract.json");

// const DeployedContract = "0x5d91a385Cf8b72853B8175C40f98c9b4dF23da3A";

// const web3Contract = new web3.eth.Contract(Contract.abi, DeployedContract);

// export default web3Contract;

const mainContract = require("./MainContract.json");
const postContract = require("./PostNewsContract.json");

const deployedMain = "0xbB45AE3c944a9001689aa584E2ABB0d9272ce2b4";
const deployedPost = "0xBEC89C64D955D691CF96175d9A4d29774A77AED2";

const mainWeb3Contract = new web3.eth.Contract(mainContract.abi, deployedMain);
const postWeb3Contract = new web3.eth.Contract(postContract.abi, deployedPost);

export { mainWeb3Contract, postWeb3Contract };
