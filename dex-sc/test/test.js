const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

const { expect } = require("chai")

const { ethers } = require("hardhat")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")

describe("Exchange", () => {
    async function runEveryTime() {
        const [owner, acc2, acc3] = await ethers.getSigners()
        const Exchange = await ethers.getContractFactory("Exchange")
        const CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS =
            "0x7F311a52734fF9604Dd3CCBa1C5666598165a7C6"
        const exchange = await Exchange.deploy(
            CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS
        )

        await exchange.deployed()

        return { exchange, owner, acc2, acc3 }
    }

    describe("Deployment", () => {
        it("Should set cryptoDevContract", async () => {
            const CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS =
                "0x7F311a52734fF9604Dd3CCBa1C5666598165a7C6"

            const { exchange, owner } = await loadFixture(runEveryTime)

            expect(await exchange.cryptoDevTokenAddress()).to.be.equal(
                CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS
            )
        })

        it("Should get Reserve", async () => {
            const { exchange, owner } = await loadFixture(runEveryTime)
            const amount = await exchange.getReserve()
            // console.log(`${amount}`)
            // expect(await exchange.getReserve()).to.be.equal(
            //     ethers.utils.parseEther("0")
            // )
        })
    })
})
