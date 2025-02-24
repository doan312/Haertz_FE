import React from 'react'
import { motion } from 'framer-motion'
import { useReservationStore } from '../../store/useReservationStore'

const ToggleButton: React.FC = () => {
    const { isOnline, setIsOnline } = useReservationStore()

    const handleToggle = () => {
        setIsOnline(!isOnline)
    }

    return (
        <div
            className='relative flex h-[2.5rem] w-full cursor-pointer items-center rounded-10 bg-gray-300'
            onClick={handleToggle}>
            <motion.div
                className='absolute flex h-[2.1rem] w-1/2 flex-1 items-center justify-center rounded-xl bg-white text-body2 font-medium text-gray-1300 shadow-slider'
                animate={{ x: isOnline ? '98%' : '2%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}>
                {isOnline ? '온라인' : '직접'}
            </motion.div>
            <div className='flex flex-1 items-center justify-center text-body2 font-normal text-gray-800'>
                직접
            </div>
            <div className='flex flex-1 items-center justify-center text-body2 font-normal text-gray-800'>
                온라인
            </div>
        </div>
    )
}

export default ToggleButton
