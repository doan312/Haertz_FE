import React from 'react'

const ReservationInfo: React.FC = () => {
    return (
        <div className='mx-auto mt-[16px] inline-flex w-fit rounded-[16px] border-[1px] border-gray-500 bg-transparent p-[16px]'>
            {/* 한 줄 정렬 */}
            <div className='flex items-center gap-x-[8px] whitespace-nowrap'>
                <span className='mr-[4px] rounded-[6px] bg-blue-100 px-[8px] py-[4px] text-[14px] font-semibold text-blue-600'>
                    온라인
                </span>
                <p className='text-[18px] font-semibold text-gray-950'>
                    03.01(토) 오전 10:00~ 오전 10:30
                </p>
            </div>
        </div>
    )
}

export default ReservationInfo
