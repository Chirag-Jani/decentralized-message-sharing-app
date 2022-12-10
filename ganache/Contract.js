import web3 from "./Web3";

const authContract = require("./build/AuthContract.json");
const mainContract = require("./build/MainContract.json");
const postContract = require("./build/PostNewsContract.json");

const deployedAuth = "0x8D02866f6A336e8109ab9a470f6d8086fa1E77f7";
const deployedMain = "0x6c05f1799B71F7B3e3844960F980a33410609ce3";
const deployedPost = "0x4717443a01d149ba8B8d4B97C94A870c99A3bB04";

const authWeb3Contract = new web3.eth.Contract(authContract.abi, deployedAuth);
const mainWeb3Contract = new web3.eth.Contract(mainContract.abi, deployedMain);
const postWeb3Contract = new web3.eth.Contract(postContract.abi, deployedPost);

export { mainWeb3Contract, postWeb3Contract, authWeb3Contract, deployedMain };
