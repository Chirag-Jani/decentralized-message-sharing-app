import web3 from "./Web3";

const authContract = require("./build/AuthContract.json");
const mainContract = require("./build/MainContract.json");
const postContract = require("./build/PostNewsContract.json");

const deployedAuth = "0x4C50E197b4e09e7E8b54De74264C9a020A9B549e";
const deployedMain = "0xE64a617f0271e9B376A5B6A23cDC66E398Ec60AC";
const deployedPost = "0xaE11b25372907df1f398B7a3a87Ba369c771BFBA";

const authWeb3Contract = new web3.eth.Contract(authContract.abi, deployedAuth);
const mainWeb3Contract = new web3.eth.Contract(mainContract.abi, deployedMain);
const postWeb3Contract = new web3.eth.Contract(postContract.abi, deployedPost);

export { mainWeb3Contract, postWeb3Contract, authWeb3Contract, deployedMain };
