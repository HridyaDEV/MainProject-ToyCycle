import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileBtn = () => {
    const navigate = useNavigate()
    return (
        <button
            className="bg-amber-950 hover:bg-amber-900 text-white px-4 py-2 rounded-lg font-semibold"
            onClick={() => navigate("/Profile")}
        >
            Profile
        </button>
    )
}

export default ProfileBtn
