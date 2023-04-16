const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

const { expect } = require("chai")

const { ethers } = require("hardhat")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { parseUnits, parseEther } = require("ethers/lib/utils")

const NAME = "Degen"
const SYMBOL = "DG"
const URI = "degenuri"
describe("TokenFactory", () => {
    async function runEveryTime() {
        const [owner, acc2, acc3] = await ethers.getSigners()
        const TokenFactory = await ethers.getContractFactory("TokenFactory")
        const tokenFactory = await TokenFactory.deploy()

        await tokenFactory.deployed()

        return { tokenFactory, owner, acc2, acc3 }
    }

    describe("Deployment", () => {
        it("Should Create New Token", async () => {
            const { tokenFactory, owner } = await loadFixture(runEveryTime)

            const tx = await tokenFactory
                .connect(owner)
                .createNewToken(NAME, SYMBOL, URI)
            await tx.wait()
            expect(tx).to.emit(tokenFactory, "TokenCreated")

            const index = await tokenFactory
                .connect(owner)
                .indexArry(owner.address)
            expect(index).to.equal(parseUnits("0"))

            const tokenAddress = await tokenFactory
                .connect(owner)
                .TokenFactoryArray(index)
            console.log(tokenAddress)
        })
    })
})

describe("Auction", () => {
    let Auction
    let auction
    let NFT
    let nft
    let owner
    let addr1
    let addr2
    let addrs
    let auctionIndex
    let tokenIndex

    beforeEach(async () => {
        ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
        const AuctionContract = await ethers.getContractFactory("Auction")

        Auction = await AuctionContract.deploy()

        await Auction.deployed()

        const TokenFactory = await ethers.getContractFactory("TokenFactory")

        const tokenFactory = await TokenFactory.deploy()
        await tokenFactory.deployed()

        const tx = await tokenFactory
            .connect(owner)
            .createNewToken(NAME, SYMBOL, URI)
        await tx.wait()

        expect(tx).to.emit(tokenFactory, "TokenCreated")

        tokenIndex = await tokenFactory.connect(owner).indexArry(owner.address)
        console.log(tokenIndex)

        nft = await tokenFactory.connect(owner).TokenFactoryArray(tokenIndex)
        console.log(nft)

        auctionIndex = await Auction.connect(owner).createAuction(
            0,
            parseEther("1"),
            60 * 60,
            0,
            nft
        )

        auction = Auction.connect(owner)
    })
    it("Should be 0", () => {
        expect(tokenIndex).to.equal(parseUnits("0"))
    })

    it("Should create a new auction", async () => {
        expect(await auction.getOwner(tokenIndex, auctionIndex.value)).to.equal(
            owner.address
        )
        expect(
            await auction.getTokenURI(tokenIndex, auctionIndex.value)
        ).to.equal(URI)

        // await nft.approve(auction.address, 0)
    })
})
