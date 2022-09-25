import web3 from "./Web3";

const Contract = require("./Contract.json");

const DeployedContract = "0xB20A325f7b20CFf4aF40Ed7436732eF820270D5E";

const web3Contract = new web3.eth.Contract(Contract.abi, DeployedContract);

export default web3Contract;
