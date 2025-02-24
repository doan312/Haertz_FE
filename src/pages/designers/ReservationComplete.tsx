import React, { useState } from 'react'
import PaymentInfo from '../../components/reservationcompletes/PaymentInfo'
import ReservationInfo from '../../components/reservationcompletes/ReservationInfo'
import ReservationCompleteIcon from '../../assets/icons/Reservation complete.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import heartAnimation from '../../assets/lotties/heart.json'
import Lottie from 'lottie-react'

import FadePopup from '../../components/reservationcompletes/FadePopup' // ✅ 팝업 컴포넌트 import

const ReservationComplete: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search)
    const paymentMethod = queryParams.get('type') || ''

    const [showPopup, setShowPopup] = useState(false)

    // PaymentInfo 클릭 시 팝업 표시
    const handlePaymentInfoClick = () => {
        setShowPopup(true) // ✅ 팝업 표시
    }

    return (
        <div className='flex min-h-[100vh] flex-col items-center justify-center bg-white px-[24px] py-[40px] pb-[96px]'>
            {/* 아이콘 및 애니메이션 컨테이너 */}
            <div className='relative mb-[24px] flex h-[64px] w-[64px] flex-col items-center justify-end'>
                {/* Lottie 애니메이션 */}
                <div className='absolute top-[-100px] h-[88px] w-[88px] opacity-70'>
                    <Lottie animationData={heartAnimation} loop={false} />
                </div>
                {/* 기존 아이콘 */}
                <img
                    src={ReservationCompleteIcon}
                    alt='예약 완료 아이콘'
                    className='h-[64px] w-[64px]'
                />
            </div>

            {/* 예약 완료 텍스트 */}
            <h2 className='text-[24px] font-bold text-gray-900'>
                예약이 완료됐어요
            </h2>

            {/* 예약 정보 */}
            <div className='mb-[4px]'>
                <ReservationInfo key='reservation-info' />
            </div>
            {/* 결제 정보 (누르면 팝업 표시) */}
            {paymentMethod === 'bankTransfer' && (
                <div
                    className='cursor-pointer'
                    onClick={handlePaymentInfoClick}>
                    <PaymentInfo key='payment-info' />
                </div>
            )}

            {/* 하단 고정 버튼 그룹 */}
            <div className='fixed bottom-0 left-0 right-0 mx-auto w-full min-w-[375px] max-w-[480px] bg-white shadow-[0px_4px_10px_rgba(0,0,0,0.1)]'>
                {/* 계좌 복사 버튼 (페이드인/페이드아웃) */}

                {/* ✅ 페이드인 팝업 */}
                <FadePopup
                    show={showPopup}
                    message='계좌번호가 복사됐어요.'
                    onClose={() => setShowPopup(false)}
                />

                {/* 구분선: 양 끝까지 닿도록 수정 */}
                <hr className='w-full border-t-[1px] border-gray-300' />

                {/* 하단 버튼들 */}
                <div className='mx-auto flex flex-col items-center px-[16px] py-[20px]'>
                    <div className='flex w-full max-w-[400px] gap-[16px]'>
                        <button
                            className='w-[50%] rounded-[12px] bg-black px-[24px] py-[12px] text-[18px] font-medium text-white shadow-md'
                            onClick={() => navigate('/reservationinquiry')}>
                            예약 확인
                        </button>
                        <button
                            className='w-[50%] rounded-[12px] bg-black px-[24px] py-[12px] text-[18px] font-medium text-white shadow-md'
                            onClick={() => navigate('/')}>
                            홈
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservationComplete
