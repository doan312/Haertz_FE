import React from 'react'

interface CancelPopupProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

const CancelPopup: React.FC<CancelPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div
                className='w-[320px] rounded-[16px] bg-white p-[20px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)]'
                onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 방지
            >
                <h3 className='mb-[4px] mt-[8px] text-center text-[20px] font-bold text-black'>
                    예약 취소
                </h3>
                <h3 className='font-base mb-[16px] text-center text-[16px] text-black'>
                    정말 취소하시겠습니까?
                </h3>
                <div className='flex justify-between gap-[24px]'>
                    {/* 계좌 이체 버튼 */}
                    <button className='w-[50%] rounded-[12px] bg-black px-[8px] py-[12px] font-semibold text-white'>
                        취소
                    </button>
                    {/* 닫기 버튼 */}
                    <button
                        className='w-[50%] rounded-[12px] bg-black px-[16px] py-[12px] font-semibold text-white'
                        onClick={onClose}>
                        닫기
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CancelPopup
