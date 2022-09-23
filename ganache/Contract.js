import web3 from "./Web3";

const Contract = require("./build/Contract.json");

const DeployedContract = "0x46abB328c9ddaf1AE28e61c6539cE0FedFFF6f50";

const web3Contract = new web3.eth.Contract(Contract.abi, DeployedContract);

export default web3Contract;
