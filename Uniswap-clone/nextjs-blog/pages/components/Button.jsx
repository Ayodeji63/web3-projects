import React from "react"

const Button = ({ click, text }) => {
    return (
        <div className="swapBtn bg-[#0152a9] mt-5" onClick={click}>
            {text}
        </div>
    )
}

export default Button
