import React, { useEffect } from 'react'

interface FadePopupProps {
    show: boolean
    message: string
    onClose: () => void
}

const FadePopup: React.FC<FadePopupProps> = ({ show, message, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose() // 1초 후 자동 닫기
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [show, onClose])

    return (
        <div
            className={`fixed bottom-160 left-1/2 -translate-x-1/2 transform rounded-full bg-purple-100 px-70 py-15 text-lg text-gray-900 shadow-md transition-opacity duration-500 ${
                show ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            style={{ whiteSpace: 'nowrap' }} // ✅ 텍스트 한 줄 유지
        >
            {message}
        </div>
    )
}

export default FadePopup
