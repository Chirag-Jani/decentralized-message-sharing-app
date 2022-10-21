import web3 from "./Web3";

const Contract = require("./build/Contract.json");

const DeployedContract = "0x0dcf26D758f056dBD6b8D024896F7d09E47139F3";

const web3Contract = new web3.eth.Contract(Contract.abi, DeployedContract);

export default web3Contract;
