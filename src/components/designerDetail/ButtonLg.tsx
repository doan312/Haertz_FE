import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ButtonLgProps {
    text: string
    available: boolean
    designerId: string
}

const ButtonLg: React.FC<ButtonLgProps> = ({ text, available, designerId }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/paymenttransfer?id=${designerId}`)
    }
    return (
        <div className={`h-88 border-t-1 border-t-gray-300 px-16 pb-30 pt-10`}>
            <button
                type='button'
                disabled={!available}
                onClick={handleClick}
                className={`flex h-48 w-full items-center justify-center rounded-10 text-body1 font-medium text-gray-100 ${
                    available ? 'bg-gray-1200' : 'bg-gray-600'
                }`}>
                {text}
            </button>
        </div>
    )
}

export default ButtonLg
