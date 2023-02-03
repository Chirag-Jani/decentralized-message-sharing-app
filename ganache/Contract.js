import web3 from "./Web3";

const authContract = require("./build/AuthContract.json");
const mainContract = require("./build/MainContract.json");
const postContract = require("./build/PostNewsContract.json");

const deployedAuth = "0xB4a580a9FDf91D7E125ef2e98E6b681FB6Ab7825";
const deployedMain = "0x788ff306b861BebD779C4524b0Cec9c70d59eeC7";
const deployedPost = "0x1A4E344e32A31F6A45f568689f930f31391588Ef";

const authWeb3Contract = new web3.eth.Contract(authContract.abi, deployedAuth);
const mainWeb3Contract = new web3.eth.Contract(mainContract.abi, deployedMain);
const postWeb3Contract = new web3.eth.Contract(postContract.abi, deployedPost);

export { mainWeb3Contract, postWeb3Contract, authWeb3Contract, deployedMain };
