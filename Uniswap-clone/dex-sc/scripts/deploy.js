// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")

async function main() {
    const CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS =
        "0x3E5789040ce4b7B4a35e8f7CDE28CaF55A1c4E8e"
    const Ex = await hre.ethers.getContractFactory("Exchange")
    const ex = await Ex.deploy("0x3E5789040ce4b7B4a35e8f7CDE28CaF55A1c4E8e")

    await ex.deployed()

    console.log(`Contract deployed at`, ex.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
