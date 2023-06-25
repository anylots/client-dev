require("dotenv").config({ path: ".env" });

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.

const { GOERLI_PRIVATE_KEY, ALCHEMY_PROJECT_ID, POLYGON_TEST_PRIVATE_KEY, POLYGON_MAINNEI_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.2" }
    ]
  },
  networks: {
    hardhat: {
      chainId: 1336 // We set 1337 to make interacting with MetaMask simpler
    },
    scrollGeth: {
      chainId: 53077,
      url: `http://127.0.0.1:8545`,
      accounts: ['']
    },
  }
};
