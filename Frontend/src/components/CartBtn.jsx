import React from 'react'
import { BsFillCartFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const CartBtn = () => {
    const navigate = useNavigate()
    return (
        <button className="relative bg-amber-950 hover:bg-amber-900 text-white p-2 rounded-lg transition shadow-md"
            onClick={() => navigate("/cart")}
        >
            <BsFillCartFill className="text-xl" />
            {/* Badge  */}
            {/* <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-1 rounded-full transform translate-x-1/2 -translate-y-1/2">
                3
            </span> */}
        </button>
    )
}

export default CartBtn
