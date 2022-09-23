import web3 from "./Web3";

const Contract = require("./build/Contract.json");

const DeployedContract = "0xa2d764CDFD1A7a3430fD8eeC22B89e8997517dAa";

const web3Contract = new web3.eth.Contract(Contract.abi, DeployedContract);

export default web3Contract;
