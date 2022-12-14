const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

let buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

let contractPath = path.resolve(__dirname, "contracts", "AuthContract.sol");
let contractSource = fs.readFileSync(contractPath, "utf-8");

let input = {
  language: "Solidity",
  sources: {
    "AuthContract.sol": {
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

let output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
fs.ensureDirSync(buildPath);

for (let contract in output["AuthContract.sol"]) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output["AuthContract.sol"][contract]
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

contractPath = path.resolve(__dirname, "contracts", "MainContract.sol");
contractSource = fs.readFileSync(contractPath, "utf-8");

input = {
  language: "Solidity",
  sources: {
    "MainContract.sol": {
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

output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
fs.ensureDirSync(buildPath);

for (let contract in output["MainContract.sol"]) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output["MainContract.sol"][contract]
  );
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

contractPath = path.resolve(__dirname, "contracts", "PostNewsContract.sol");
contractSource = fs.readFileSync(contractPath, "utf-8");

input = {
  language: "Solidity",
  sources: {
    "PostNewsContract.sol": {
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

output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;
fs.ensureDirSync(buildPath);

for (let contract in output["PostNewsContract.sol"]) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output["PostNewsContract.sol"][contract]
  );
}
