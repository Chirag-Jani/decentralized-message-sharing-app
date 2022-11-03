import web3 from "./Web3";

const authContract = require("./build/AuthContract.json");
const mainContract = require("./build/MainContract.json");
const postContract = require("./build/PostNewsContract.json");

const deployedAuth = "0xB6008CE69630eE656ec75c460Bacc665D9f3D6e1";
const deployedMain = "0x4E77436C563F36FC8cc4F1096A5717b76dd7fD5d";
const deployedPost = "0x334C86746Ca6B201d51AB8AADc5431012D06ef80";

const authWeb3Contract = new web3.eth.Contract(authContract.abi, deployedAuth);
const mainWeb3Contract = new web3.eth.Contract(mainContract.abi, deployedMain);
const postWeb3Contract = new web3.eth.Contract(postContract.abi, deployedPost);

export { mainWeb3Contract, postWeb3Contract, authWeb3Contract, deployedMain };
