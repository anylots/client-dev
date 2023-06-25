const { BigNumber } = require("ethers")
const { ethers } = require('ethers');

const overrides = {
  gasLimit: 15000000,
  gasPrice: 40 * 10 ** 9,
};

let provider = new ethers.providers.JsonRpcProvider(
  "http://127.0.0.1:8545"
);


// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {

  ///prepare deployer
  let privateKey = "";
  const signer = new ethers.Wallet(privateKey, provider);


  ///deploy Token
  const Token_Artifact = require("./Token.sol/TestZkEVM.json");
  factory = new ethers.ContractFactory(Token_Artifact.abi, Token_Artifact.bytecode, signer)

  // Deploy an instance of the contract
  testZkEVM = await factory.deploy(BigNumber.from(10 ** 12).mul(BigNumber.from(10 ** 6)));

  //await testZkEVM.deployed();
  console.log("testZkEVM address:", testZkEVM.address);

  let deployer_balance = await testZkEVM.balanceOf(signer.getAddress());
  console.log("deployer_balance:" + deployer_balance);
}




main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
