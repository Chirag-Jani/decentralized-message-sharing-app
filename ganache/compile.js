const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, "contracts", "Contract.sol");
const contractSource = fs.readFileSync(contractPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    "Contract.sol": {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
fs.ensureDirSync(buildPath);

for (let contract in output["Contract.sol"]) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output["Contract.sol"][contract]
  );
}
