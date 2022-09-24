import web3 from "./Web3";

const Contract = require("./build/Contract.json");

const DeployedContract = "0x069E8CC6083417B67731bf935E79F359d46faB16";

const web3Contract = new web3.eth.Contract(Contract.abi, DeployedContract);

export default web3Contract;
