import web3 from "./Web3";

const authContract = require("./build/AuthContract.json");
const mainContract = require("./build/MainContract.json");
const postContract = require("./build/PostNewsContract.json");

const deployedAuth = "0xb1149F4B0C7a84E16f1A2291982801297371B497";
const deployedMain = "0x3c740EEBB9322C1EFc65DBb2d7b027191e8ef047";
const deployedPost = "0x3cceDBe11501C35B7379246e5886938dc4d5ACd5";

const authWeb3Contract = new web3.eth.Contract(authContract.abi, deployedAuth);
const mainWeb3Contract = new web3.eth.Contract(mainContract.abi, deployedMain);
const postWeb3Contract = new web3.eth.Contract(postContract.abi, deployedPost);

export { mainWeb3Contract, postWeb3Contract, authWeb3Contract, deployedMain };
