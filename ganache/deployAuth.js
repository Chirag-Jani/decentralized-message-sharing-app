// const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledAuthContract = require("./build/AuthContract.json");

// const provider = new HDWalletProvider(
//   "arch piece seat curtain fitness tunnel oblige upper news execute lesson bounce",
//   "https://rinkeby.infura.io/v3/04280dc3e8a2405db2111ac4490d86be"
// );
// const web3 = new Web3("provider");

const web3 = new Web3("http://127.0.0.1:8545");

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);

    const Contract = await new web3.eth.Contract(compiledAuthContract.abi)
      .deploy({ data: compiledAuthContract.evm.bytecode.object })
      .send({ from: accounts[0], gas: "9000000" });

    console.log("Auth Contract deployed at " + Contract.options.address); // 0xbc652C46867a58dc8453fD3c0de9929cdC716bE6
    process.exit(0);
  } catch (err) {
    console.log(err.message);
  }
};

deploy();
