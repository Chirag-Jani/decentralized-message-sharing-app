import web3 from "./Web3";

const authContract = require("./build/AuthContract.json");
const mainContract = require("./build/MainContract.json");
const postContract = require("./build/PostNewsContract.json");

const deployedAuth = "0x085355283b41bDCc31206E09ad79930B6Baaf459";
const deployedMain = "0xB717582fde90020CFD27071225135EdAA2dF0Fad";
const deployedPost = "0xc734cEc018E07090E959f0797dc0584272B50B25";

const authWeb3Contract = new web3.eth.Contract(authContract.abi, deployedAuth);
const mainWeb3Contract = new web3.eth.Contract(mainContract.abi, deployedMain);
const postWeb3Contract = new web3.eth.Contract(postContract.abi, deployedPost);

export { mainWeb3Contract, postWeb3Contract, authWeb3Contract, deployedMain };
