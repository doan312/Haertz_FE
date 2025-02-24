import React, { useState } from 'react'
import CancelPopup from './CancelPopup'
import {
    CalendarIcon,
    ClockIcon,
    MapPinIcon,
    ClipboardIcon,
} from '@heroicons/react/24/outline'
import { copyToClipboard } from '../../utils/clipboard' // 📌 클립보드 유틸 파일 가져오기
import { useDeleteBooking } from '../../apis/api/delete/useDeleteBooking' // ✅ 예약 삭제 API 훅 추가
import { useNavigate } from 'react-router-dom'

interface Reservation {
    id: number
    name: string
    date: string
    time: string
    location: string
    status: '결제 완료' | '입금 확인중' | '상담 완료' | '상담 취소'
    online: boolean
    profileImage?: string
    type: '직접' | '온라인'
}

// ✅ 상태 뱃지 스타일
const getStatusBadgeStyle = (status: string) => {
    switch (status) {
        case '결제 완료':
            return 'border border-gray-700 text-gray-700 bg-transparent'
        case '입금 확인중':
            return 'border border-red-500 text-red-600 bg-transparent'
        case '상담 완료':
            return 'border border-gray-700 text-gray-700 bg-transparent'
        case '상담 취소':
            return 'border border-red-500 text-red-600 bg-transparent'
        default:
            return 'border border-gray-700 text-gray-700 bg-transparent'
    }
}

// ✅ 유형 뱃지 스타일
const getTypeBadgeStyle = (type: string) =>
    type === '온라인'
        ? 'bg-blue-100 text-blue-600 px-[8px] py-[4px] rounded text-[12px]'
        : 'bg-red-100 text-red-600 px-[8px] py-[4px] rounded text-[12px]'

// ✅ 버튼 스타일
const getButtonStyle = (disabled: boolean) =>
    `w-full py-[8px] rounded-[12px] bg-white font-medium border-[1px] border-gray-500 select-none ${
        disabled
            ? 'cursor-not-allowed text-gray-400 border-gray-500 pointer-events-none'
            : 'text-black'
    }`

// ✅ 예약 카드 컴포넌트
const ReservationCard: React.FC<{ reservation: Reservation }> = ({
    reservation,
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false) // ✅ 취소 팝업 상태

    // ✅ 예약 삭제 요청 훅 사용
    const { mutate: deleteBooking } = useDeleteBooking()

    // ✅ 예약 취소 버튼 클릭 시 팝업 오픈
    const handleCancelClick = () => setIsPopupOpen(true)

    // ✅ 취소 팝업 닫기
    const handleClosePopup = () => setIsPopupOpen(false)

    // ✅ 예약 취소 확인 버튼 클릭 시 실행되는 함수
    const handleConfirmCancel = () => {
        setIsPopupOpen(false)

        // ✅ DELETE 요청 실행 (예약 ID 포함)
        deleteBooking(
            { bookingId: reservation.id },
            {
                onSuccess: (data) => {
                    console.log(`✅ 예약 취소 완료: ${reservation.id}`, data)
                    alert('예약이 성공적으로 취소되었습니다.')
                },
                onError: (error) => {
                    console.error('❌ 예약 취소 실패:', error)
                    alert('예약 취소에 실패했습니다. 다시 시도해주세요.')
                },
            }
        )
    }

    const navigate = useNavigate()
    const handleNavigate = () => {
        // ✅ 예약 상세 페이지로 이동하는 함수
        return () => {
            console.log(`🚀 예약 상세 페이지로 이동: ${reservation.id}`)
            navigate(`/designerdetail?id=${reservation.id}`)
        }
    }

    return (
        <div
            className='relative mb-[16px] rounded-[16px] bg-white p-[12px]'
            style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {/* 상태 뱃지 */}
            <span
                className={`absolute left-[12px] top-[12px] rounded-full px-[12px] py-[4px] text-[12px] ${getStatusBadgeStyle(reservation.status)}`}>
                {reservation.status}
            </span>

            {/* 예약 정보 */}
            <div
                className='mt-[40px] flex items-center gap-[16px]'
                onClick={handleNavigate()}>
                {/* 프로필 이미지 */}
                <div className='mr-[4px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-gray-300 text-[14px] font-bold text-gray-500'>
                    {reservation.profileImage ? (
                        <img
                            src={reservation.profileImage}
                            alt={reservation.name}
                            className='h-[48px] w-[48px] rounded-full border border-gray-300 object-cover'
                        />
                    ) : (
                        '👤'
                    )}
                </div>
                {/* 디자이너 정보 */}
                <div>
                    <h4 className='text-[18px] font-bold text-black'>
                        {reservation.name}
                    </h4>
                    <span className={getTypeBadgeStyle(reservation.type)}>
                        {reservation.type}
                    </span>
                </div>
            </div>

            {/* 예약 상세 정보 */}
            <div className='mt-[16px] rounded-[8px] bg-gray-200 p-[12px] text-[14px]'>
                <p className='mb-[4px] flex items-center gap-[8px] text-gray-950'>
                    <CalendarIcon className='h-[20px] w-[20px] text-gray-700' />
                    {reservation.date} (
                    {new Date(reservation.date).toLocaleDateString('ko-KR', {
                        weekday: 'short',
                    })}
                    )
                </p>
                <p className='mb-[4px] flex items-center gap-[8px] text-gray-950'>
                    <ClockIcon className='h-[20px] w-[20px] text-gray-700' />
                    {reservation.time}
                </p>
                <p className='flex items-center gap-[8px] text-gray-950'>
                    <MapPinIcon className='h-[20px] w-[20px] text-gray-700' />
                    {reservation.location}
                    <ClipboardIcon
                        className='h-[16px] w-[16px] cursor-pointer text-gray-600 transition-all duration-150 hover:text-gray-600'
                        onClick={() => copyToClipboard(reservation.location)}
                        title='주소 복사'
                    />
                </p>
            </div>

            {/* 버튼 영역 */}
            <div className='mt-[12px] flex gap-[10px]'>
                {reservation.status === '입금 확인중' ? (
                    <button
                        className={getButtonStyle(false)}
                        onClick={handleCancelClick}>
                        예약 취소
                    </button>
                ) : reservation.status === '결제 완료' && reservation.online ? (
                    <>
                        <button
                            className={getButtonStyle(false)}
                            onClick={() =>
                                window.open(
                                    'https://docs.google.com/document/d/1yOYJgiM_-5b42Wb9DnTfcr3GhGG8wkxW1REuAVPGyog/edit?tab=t.0',
                                    '_blank'
                                )
                            }>
                            요약 리포트
                        </button>
                        <button
                            className={getButtonStyle(false)}
                            onClick={() =>
                                window.open(
                                    'https://meet.google.com/rag-gbqn-yuf',
                                    '_blank'
                                )
                            }>
                            미팅 입장하기
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className={getButtonStyle(true)}
                            onClick={() =>
                                window.open(
                                    'https://docs.google.com/document/d/1yOYJgiM_-5b42Wb9DnTfcr3GhGG8wkxW1REuAVPGyog/edit?tab=t.0',
                                    '_blank'
                                )
                            }>
                            요약 리포트
                        </button>
                        <button className={getButtonStyle(true)} disabled>
                            후기 남기기
                        </button>
                    </>
                )}
            </div>

            {/* 취소 팝업 */}
            <CancelPopup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                onConfirm={handleConfirmCancel}
            />
        </div>
    )
}

export default ReservationCard
