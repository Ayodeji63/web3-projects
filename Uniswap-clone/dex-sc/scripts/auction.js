const hre = require("hardhat")

async function main() {
    const [deployer] = await hre.ethers.getSigners()
    const TokenFactory = await hre.ethers.getContractFactory("TokenFactory")
    const tokenFactory = await TokenFactory.deploy()

    await tokenFactory.deployed()
    console.log(`TokenFactory deployed at`, tokenFactory.address)

    const Auction = await hre.ethers.getContractFactory("Auction")
    const auction = await Auction.deploy()

    await auction.deployed()
    console.log(`Auction deployed at`, auction.address)
}

main().catch((e) => {
    console.error(e)
    process.exitCode = 1
})
