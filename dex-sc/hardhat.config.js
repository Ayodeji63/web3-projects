require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config({ path: ".env" })

/** @type import('hardhat/config').HardhatUserConfig */
const RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const G_URL = process.env.G_URL
module.exports = {
    solidity: "0.8.18",
    networks: {
        sepolia: {
            url: G_URL,
            accounts: [PRIVATE_KEY],
        },
        goerli: {
            url: G_URL,
            accounts: [PRIVATE_KEY],
        },
    },
}
