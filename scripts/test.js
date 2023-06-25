const { ethers } = require('ethers');
const Token_Artifact = require("./Token.sol/TestZkEVM.json");
const token_address = "0xc94D0bfe16B83AA9F404C3c407F6BcBB41f06f5a";

let provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
);


async function main() {
    // let block = await provider.getBlock(4);
    // console.log(block)
    // let tx = await provider.getTransaction("0x5703d8c829ea1da13b4591432e4b87da694802753cecdcbe8480f0a8070d61f5");
    // console.log(tx)

    // await transferType0()
    await transferERC20();

}

async function transferERC20() {
    let privateKey = "";
    const signer = new ethers.Wallet(privateKey, provider);

    console.log(signer.address);
    let token = new ethers.Contract(token_address, Token_Artifact.abi, signer);
    let txData = await token.populateTransaction.transfer("0xED5715a8b0c4C12fE4119026449a3D983BF67E6D", ethers.utils.parseUnits("10", 6));
    txData.type = 0;
    txData.chainId = 53077;
    txData.nonce = await provider.getTransactionCount("0xa2b6f4b37649c4e728895324fcbf72e1e18abf88")

    let tx = await signer.sendTransaction(txData);


    //    let tx =  await token.transfer("0xED5715a8b0c4C12fE4119026449a3D983BF67E6D", ethers.utils.parseUnits("10", 6));
    console.log(tx);
}



async function transfer() {
    let privateKey = "";
    const signer = new ethers.Wallet(privateKey, provider);

    console.log(signer.address);

    const txReceipt = await signer.sendTransaction({
        chainId: 53077,
        to: "0xED5715a8b0c4C12fE4119026449a3D983BF67E6D",
        value: ethers.utils.parseEther('1.0'),
    });
    await txReceipt.wait();
    console.log(txReceipt)
}

async function transferType0() {
    let privateKey = "ebd24eb9345e93582be65937c87932f8b7e97c80c4d51e83b1e2bdc33c4acc42";
    const signer = new ethers.Wallet(privateKey, provider);

    const nonce = await provider.getTransactionCount("0xa2b6f4b37649c4e728895324fcbf72e1e18abf88")
    console.log(nonce)
    tx = {
        nonce: nonce,
        gasPrice: 10000000000,
        gasLimit: 1000000,
        to: "0xED5715a8b0c4C12fE4119026449a3D983BF67E6D",
        value: ethers.utils.parseEther("0.001"),
        data: "",
        chainId: 53077,
        type: 0
    }
    let resp = await signer.signTransaction(tx)
    // console.log(resp)
    const sentTxResponse = await signer.sendTransaction(tx);
    console.log(sentTxResponse)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });