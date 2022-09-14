// const web3 = require("web3");\
import web3 from "../contractInfo/Web3";

const TestContract = require("./TestContract.json");

const DeployedTestContract = "0xbc652C46867a58dc8453fD3c0de9929cdC716bE6";

const web3Contract = new web3.eth.Contract(
  TestContract.abi,
  DeployedTestContract
);
export default web3Contract;
