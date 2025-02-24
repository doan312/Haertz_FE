import React from 'react'

interface TimeSelectBarProps {
    selectedTime: string | null
    handleTimeClick: (time: string) => void
    timeTable: string[]
}

const TimeSelectBar: React.FC<TimeSelectBarProps> = ({
    selectedTime,
    handleTimeClick,
    timeTable,
}) => {
    return (
        <div className='flex flex-row gap-[0.62rem] overflow-scroll'>
            {timeTable.map((time, index) => (
                <button
                    key={index}
                    onClick={() => handleTimeClick(time)}
                    className={`min-h-[2.25rem] min-w-[4.75rem] rounded-xl p-2 text-center text-caption font-normal text-gray-1300 transition ${
                        selectedTime === time
                            ? 'border-none bg-purple-300 text-white'
                            : 'border-1 border-gray-500 bg-white'
                    }`}>
                    {time}
                </button>
            ))}
        </div>
    )
}

export default TimeSelectBar
