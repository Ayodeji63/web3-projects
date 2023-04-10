import React from "react"

const Button = ({ click, text, halfWidth }) => {
    return (
        <div
            className={`swapBtn bg-[#0152a9] mt-5 ${
                halfWidth ? "w-[30%] animate-bounce " : ""
            }`}
            onClick={click}
        >
            {text}
        </div>
    )
}

export default Button
