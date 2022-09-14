const web3 = require("web3");

const TestContract = require("./build/TestContract.json");

const DeployedTestContract = "0xbc652C46867a58dc8453fD3c0de9929cdC716bE6";

module.exports = new web3.eth.Contract(TestContract.abi, DeployedTestContract);
