import React, { useRef, useState } from "react"
import Image from "next/image"
import { useContext } from "react"
import { HookContext } from "../../context/hook"
import { truncate } from "truncate-ethereum-address"
import Button from "./Button"
import { XCircleIcon } from "@heroicons/react/24/outline"
import FormInput from "./FormInput"
import { alpha, styled } from "@mui/material/styles"
import { pink } from "@mui/material/colors"
import Switch from "@mui/material/Switch"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { createNFt } from "../../utils/CreateNFT"
import { Blob } from "nft.storage"

const CreateNFT = () => {
    const label = { inputProps: { "aria-label": "Color switch demo" } }
    const { address, provider } = useContext(HookContext)
    const fileRef = useRef("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [nftImage, setNftImage] = useState("")
    const [name, setName] = useState("")
    const [symbol, setSymbol] = useState("")
    const [description, setDescription] = useState("")
    const [imageParam, setImageParam] = useState("")

    // const addImage = async (e) => {
    //     const reader = new FileReader()
    //     if (e.target.files[0]) {
    //         // reader.readAsText(e.target.value)
    //         reader.readAsDataURL(e.target.files[0])
    //     }
    //     reader.onload = (readerEvent) => {
    //         setNftImage(readerEvent.target.result)
    //     }
    // }

    const addImage = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const blob = await fileToBlob(file)
            setImageParam(blob)
            const image = URL.createObjectURL(blob)
            setNftImage(image)
        }
    }
    function fileToBlob(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                const arrayBuffer = reader.result
                const blob = new Blob([arrayBuffer], { type: file.type })
                resolve(blob)
            }
            reader.onerror = reject
            reader.readAsArrayBuffer(file)
        })
    }

    const removeImage = () => {
        setNftImage(null)
    }
    return (
        <div className="w-[50%] ml-auto mr-auto text-white mt-[7rem] flex justify-between overflow-hidden">
            {/* Create NFT-: ERC-721  */}
            <div className="w-[60%] overflow-auto">
                <h1 className="text-5xl font-medium mb-5">Create New NFT</h1>
                <p className="text-gray-500 font-base text-xl mb-8">
                    Single edition on Ethereum{" "}
                </p>

                <h2 className="mb-4">Choose wallet</h2>

                <div className="flex justify-between mb-8 items-start border p-4 border-[#333a4b] rounded-xl">
                    <div className="flex items-center justify-center">
                        <Image src="/ethre.webp" width={40} height={40} />
                        <div className="ml-3">
                            <p>{truncate(address)}</p>
                            <p className="text-gray-500 text-base font-medium">
                                Ethereum
                            </p>
                        </div>
                    </div>

                    {address ? (
                        <p className="text-[11px] rounded-md p-1 text-[#04a32c] bg-[#162c21]">
                            Connected
                        </p>
                    ) : (
                        <p className="text-[11px] rounded-md p-1 text-[#a31c04] bg-[#2c1616]">
                            Not connected
                        </p>
                    )}
                </div>

                <h2 className="mb-4">Upload File</h2>

                <div className=" border-dashed border-2 border-[#333a4b] rounded-xl p-7">
                    {!nftImage ? (
                        <div className="flex flex-col w-full justify-center items-center">
                            <h1 className="text-gray-500">
                                PNG,GIF,WEBP,MP4 or MP3. Max 100mb
                            </h1>

                            <div
                                className="px-3 py-2 hover:bg-blue-500 active:scale-90 transition-all duration-200 bg-[#313337] rounded-xl mt-3 cursor-pointer"
                                onClick={() => fileRef.current.click()}
                            >
                                <span>Choose File</span>
                                <input
                                    hidden
                                    type="file"
                                    ref={fileRef}
                                    onChange={addImage}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-[15rem] flex overflow-hidden">
                            <Image
                                src={nftImage}
                                width={100}
                                height={100}
                                className="w-[90%] object-cover"
                            />

                            <div>
                                <XCircleIcon
                                    className="h-7 w-7 cursor-pointer text-gray-400"
                                    onClick={removeImage}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <FormInput
                    name={"Display Name"}
                    placeholder={"Enter Collection name"}
                    required={"required"}
                    nftParam={name}
                    setNftParam={setName}
                />

                <p className="text-gray-500 text-[13px] font-medium mt-3">
                    Token Name Cannot be changed in future
                </p>

                <FormInput
                    name={"Symbol"}
                    placeholder={"Enter Token Symbol"}
                    required={"required"}
                    nftParam={symbol}
                    setNftParam={setSymbol}
                />

                <FormInput
                    name={"Description"}
                    placeholder={
                        "Spread some words about your token collection"
                    }
                    required={"optional"}
                    nftParam={description}
                    setNftParam={setDescription}
                />

                <div className="mt-8 flex w-full justify-between items-start">
                    <div>
                        <h1 className="font-medium">Put on marketplace</h1>
                        <p className="text-gray-500 text-[13px]">
                            Set a period of time for which buyers can place bids
                        </p>
                    </div>
                    <Switch
                        {...label}
                        defaultChecked
                        color="secondary"
                        disabled
                    />
                </div>

                <FormInput name={"Minimum Bid"} placeholder={"0.3 Eth"} />
                <p className="text-gray-500 text-[13px] font-medium mt-3 mb-8">
                    Bids below this amount will not be allowed
                </p>

                <FormControl className="w-[45%] bg-[#0b111c] rounded-2xl text-white">
                    <InputLabel id="demo-simple-select-label" className="label">
                        Starting Time
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={startTime}
                        label="Age"
                        onChange={(e) => setStartTime(e.target.value)}
                        className=" text-white rounded-2xl  border-[#333a4b]"
                    >
                        <MenuItem value={10}>Now</MenuItem>
                        <MenuItem value={20}>20sec</MenuItem>
                        <MenuItem value={30}>30sec</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className="w-[45%] ml-3 bg-[#0b111c] rounded-2xl text-white">
                    <InputLabel id="demo-simple-select-label" className="label">
                        Expiration Time
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={endTime}
                        label="Age"
                        onChange={(e) => setEndTime(e.target.value)}
                        className=" text-white rounded-2xl "
                    >
                        <MenuItem value={10}>150sec</MenuItem>
                        <MenuItem value={20}>200sec</MenuItem>
                        <MenuItem value={30}>300sec</MenuItem>
                    </Select>
                </FormControl>

                <div className="mt-10 mb-20">
                    <Button
                        text={"Create Collection"}
                        click={() =>
                            createNFt(
                                provider,
                                name,
                                symbol,
                                imageParam,
                                description
                            )
                        }
                    />
                </div>
            </div>

            {/* Preview NFT image  */}
            <div className=" w-[20%] fixed right-[22%] top-[30%] flex flex-col justify-center border-[#333a4b] rounded-xl ">
                <p className="mb-3 font-medium">Preview</p>
                {!nftImage ? (
                    <div className="preview">
                        <h1 className="text-gray-500">
                            Upload file and choose collection to preview your
                            brand new NFT
                        </h1>
                    </div>
                ) : (
                    <div className="preview p-5 overflow-hidden">
                        <Image
                            src={nftImage}
                            width={100}
                            height={100}
                            className="w-[90%] h-full object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreateNFT
