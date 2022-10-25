import web3 from "./Web3";

const Contract = require("./Contract.json");

const DeployedContract = "0x5d91a385Cf8b72853B8175C40f98c9b4dF23da3A";

const web3Contract = new web3.eth.Contract(Contract.abi, DeployedContract);
// window.ethereum.Contract()

export default web3Contract;
