const web3 = require("web3");

const TestContract = require("./build/TestContract.json");

const DeployedTestContract = "0x4b9c336cC6f264a48b4FBe057EDAcC15Cc758935";

module.exports = new web3.Contract(TestContract.abi, DeployedTestContract);
