const Web3 = require("web3");

let web3;
try {
  //We are on server

  // 	const provider = new HDWalletProvider(
  // 		"arch piece seat curtain fitness tunnel oblige upper news execute lesson bounce",
  // 		"https://rinkeby.infura.io/v3/04280dc3e8a2405db2111ac4490d86be"
  // 	);
  // Ganache running on port 8545
  web3 = new Web3("http://localhost:8545");
} catch (err) {
  console.log(err.message);
}

module.exports = web3;
