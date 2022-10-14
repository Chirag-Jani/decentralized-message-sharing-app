import web3 from "./Web3";

const Contract = require("./build/Contract.json");

const DeployedContract = "0x8e9723bc7A857D31CCe6bB97fDAB69c062702989";

const web3Contract = new web3.eth.Contract(Contract.abi, DeployedContract);

export default web3Contract;
