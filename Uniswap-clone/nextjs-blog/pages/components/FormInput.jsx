import React from "react"

const FormInput = ({ name, placeholder, required, nftParam, setNftParam }) => {
    return (
        <div className="w-full mt-8 ">
            <h1 className="font-medium">
                {name}
                {required && (
                    <span className="text-[13px] text-gray-500 ml-3">
                        ({required})
                    </span>
                )}
            </h1>

            <input
                type={nftParam}
                onChange={(e) => setNftParam(e.target.value)}
                placeholder={placeholder}
                className="h-12  w-full  bg-[#0b111c] focus:bg-black hover:border-[1px] hover:border-[#333a4b] rounded-xl   outline-none  shadow-lg mt-2 p-5 placeholder:text-gray-500"
            />
        </div>
    )
}

export default FormInput
