import { BigNumber, ethers, providers, utils } from "ethers"
import React, { createContext, useEffect, useRef, useState } from "react"
import { useContractRead, usePrepareContractWrite } from "wagmi"
import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    TOKEN_CONTRACT_ADDRESS,
} from "../constants"
import Web3Modal from "web3modal"
import {
    getCDTokensBalance,
    getEtherBalance,
    getLPTokensBalance,
    getReserveOfCDTokens,
} from "../utils/Exchange/getAmounts"
import { AddLiquidity } from "../utils/Exchange/addLiquidity"
import { fetchAllAuction } from "../utils/Auction/CreateNFT"

export const HookContext = createContext()
export const nftDataContext = createContext([])

HookContext.displayName = "HookContext"

export const HookProvider = ({ children }) => {
    const web3ModalRef = useRef()
    const [walletConnected, setWalletConnected] = useState(false)
    const [address, setAddress] = useState("")
    const [chain, setChain] = useState("")
    const zero = BigNumber.from(0)
    const [ethBalance, setEthBalance] = useState(zero)
    const [cdBalance, setCdBalance] = useState(zero)
    const [lpBalance, setLpBalance] = useState(zero)
    const [reserveCD, setReserveCD] = useState(zero)
    const [etherBalanceContract, setEtherBalanceContract] = useState(zero)
    const [addLiquidity, setAddLiquidity] = useState(false)
    const [provider, setProvider] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [bidParam, setBidParam] = useState({})
    const [clickedNFT, setClickedNFT] = useState({})
    const getProviderOrSigner = async (needSigner = false) => {
        const provider = await web3ModalRef.current.connect()
        const web3Provider = new providers.Web3Provider(provider)
        setProvider(web3Provider)
        const { chainId } = await web3Provider.getNetwork()
        if (chainId !== 11155111) {
            alert("Change the network to Sepolia")
            throw new Error("Change network to Sepolia")
        }
        if (needSigner) {
            const signer = web3Provider.getSigner()

            return signer
        }
        // web3Provider.getA
        return web3Provider
    }

    const connectWallet = async () => {
        try {
            await getProviderOrSigner()
            await getAmounts()
            setWalletConnected(true)
        } catch (e) {
            console.error(e)
        }
    }
    const getAmounts = async () => {
        try {
            const provider = await getProviderOrSigner(false)
            const signer = await getProviderOrSigner(true)
            const address = await signer.getAddress()
            const _ethBalance = await getEtherBalance(provider, address)
            console.log(utils.formatEther(_ethBalance))
            const _cdBalance = await getCDTokensBalance(provider, address)
            console.log(utils.formatEther(_cdBalance))
            const _lpBalance = await getLPTokensBalance(provider, address)
            console.log(utils.formatEther(_lpBalance))
            const _reservedCD = await getReserveOfCDTokens(provider)
            console.log(_reservedCD)
            const _ethBalanceContract = await getEtherBalance(
                provider,
                null,
                true
            )

            // console.log(ethers.utils.formatEther(_ethBalanceContract))
            // console.log(utils.formatEther(_reservedCD))
            // console.log(utils.formatEther(_lpBalance))
            // console.log(utils.formatEther(_cdBalance))
            setCdBalance(_cdBalance)
            setEthBalance(_ethBalance)
            setLpBalance(_lpBalance)
            setReserveCD(_reservedCD)
            setEtherBalanceContract(_ethBalanceContract)
            setAddress(address)
            console.log(utils.formatEther(reserveCD))
            console.log(utils.formatEther(etherBalanceContract))
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (!walletConnected) {
            web3ModalRef.current = new Web3Modal({
                network: "sepolia",
                providerOptions: {},
                disableInjectedProvider: false,
            })
        }
    }, [])

    return (
        <HookContext.Provider
            value={{
                connectWallet,
                address,
                ethBalance,
                cdBalance,
                walletConnected,
                addLiquidity,
                setAddLiquidity,
                provider,
                getAmounts,
                getProviderOrSigner,
                reserveCD,
                etherBalanceContract,
                lpBalance,
                showModal,
                setShowModal,
                bidParam,
                setBidParam,
                setClickedNFT,
            }}
        >
            {children}{" "}
        </HookContext.Provider>
    )
}
