import React, { useState, useEffect } from 'react'
import PaymentModal from '../../components/paymenttransfers/PaymentModal'
import InfoForm from '../../components/paymenttransfers/InfoForm'
import { useReservationStore } from '../../store/useReservationStore'
import { useLocation } from 'react-router-dom'
import { chips } from '../../utils/chips'
import dayjs from 'dayjs'
import { useGetDesignerInfo } from '../../apis/api/get/useGetDesignerInfo'
import { usePostKakaoPay } from '../../apis/api/post/usePostKakaoPay'
import { usePostBankTransfer } from '../../apis/api/post/usePostBankTransfer'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { usePostBooking } from '../../apis/api/post/usePostBooking' // ✅ 예약 등록 훅 추가
import { useReservationCompleteStore } from '../../store/useReservationCompleteStore'

const PaymentTransfer: React.FC = () => {
    const [showModal, setShowModal] = useState(false)
    const [request, setRequest] = useState('')
    const navigate = useNavigate()
    const [isBooking, setIsBooking] = useState(false)

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [showModal])

    const { mutate: postKakaoPay } = usePostKakaoPay()
    const { mutate: postBankTransfer } = usePostBankTransfer()
    const { mutate: postBooking } = usePostBooking()

    const { setReservationCompleteData } = useReservationCompleteStore()

    useEffect(() => {
        // ✅ 세션에서 `pg_token` 가져오기
        const pg_token = sessionStorage.getItem('pg_token')
        const designerScheduleId = sessionStorage.getItem('designerScheduleId')

        //계좌이체 로직
        if (designerScheduleId && isBooking) {
            console.log('📌 저장된 designerScheduleId:', designerScheduleId)

            // ✅ 예약 등록 요청 실행
            const bookingData = {
                designerScheduleId: Number(designerScheduleId),
                requestDetails: request,
                meetingType: isOnline
                    ? 'REMOTE'
                    : ('FACE_TO_FACE' as 'REMOTE' | 'FACE_TO_FACE'),
            }

            console.log(
                '📤 예약 등록 요청 바디:',
                JSON.stringify(bookingData, null, 2)
            )

            postBooking(bookingData, {
                onSuccess: () => {
                    console.log('✅ 예약 등록 성공!')
                    console.log('✅ 예약 정보:', bookingData)
                    setReservationCompleteData(bookingData)
                    setIsBooking(false)
                    navigate('/reservationcomplete?type=bankTransfer')
                },
                onError: (error) => {
                    console.error('❌ 예약 등록 실패:', error)
                    setIsBooking(false)
                    navigate('/paymentfailed')
                },
            })
        }
        //카카페 로직
        if (pg_token && designerScheduleId && isBooking) {
            console.log('✅ 세션에서 가져온 pg_token:', pg_token)
            console.log('📌 저장된 designerScheduleId:', designerScheduleId)

            // ✅ 예약 등록 요청 실행
            const bookingData = {
                designerScheduleId: Number(designerScheduleId),
                requestDetails: request,
                meetingType: isOnline
                    ? 'REMOTE'
                    : ('FACE_TO_FACE' as 'REMOTE' | 'FACE_TO_FACE'),
            }

            console.log(
                '📤 예약 등록 요청 바디:',
                JSON.stringify(bookingData, null, 2)
            )

            postBooking(bookingData, {
                onSuccess: () => {
                    console.log('✅ 예약 등록 성공!')
                    setIsBooking(false)
                    navigate('/reservationcomplete')
                },
                onError: (error) => {
                    console.error('❌ 예약 등록 실패:', error)
                    setIsBooking(false)
                    navigate('/paymentfailed')
                },
            })
        }
    }, [postBooking, navigate, isBooking])

    // ✅ 결제 모달에서 선택한 결제 방식을 처리하는 함수
    const handlePaymentSelection = (paymentMethod: string | null) => {
        setShowModal(false) // 모달 닫기

        if (!paymentMethod) {
            console.log('🚫 결제 방식이 선택되지 않았습니다.')
            return
        }

        console.log(`✅ 선택된 결제 방식: ${paymentMethod}`)

        // ✅ reservationDate를 YYYY-MM-DD 형식으로 변환
        const formattedDate = dayjs(reservationDate).format('YYYY-MM-DD')

        console.log(`${reservationTimeRaw}`)
        // ✅ 공통 요청 데이터
        const requestBody = {
            designerId: Number(designerId),
            bookingDate: formattedDate, // 🔹 변환된 날짜 사용
            bookingTime: reservationTimeRaw || '', //
            item_name: 'test',
            quantity: 1,
            total_amount: 10,
            tax_free_amount: 0,
        }

        console.log(`📤 ${paymentMethod} 요청 데이터:`, requestBody)

        // ✅ 결제 방식에 따라 API 호출 분기
        if (paymentMethod === 'kakaoPay') {
            postKakaoPay(requestBody, {
                onSuccess: (data) => {
                    console.log('✅ 카카오페이 결제 요청 성공:', data)
                    const { tid, designerScheduleId, next_redirect_pc_url } =
                        data

                    console.log('📌 designerScheduleId:', designerScheduleId)

                    // 🔹 세션에 tid & designerScheduleId 저장
                    sessionStorage.setItem('tid', tid)
                    sessionStorage.setItem(
                        'designerScheduleId',
                        designerScheduleId.toString()
                    )

                    setIsBooking(true)

                    // 🔹 결제 창 열기
                    window.location.href = next_redirect_pc_url
                },
                onError: (error) => handlePaymentError(error, '카카오페이'),
            })
        } else if (paymentMethod === 'bankTransfer') {
            postBankTransfer(requestBody, {
                onSuccess: (data) => {
                    console.log('✅ 계좌이체 결제 요청 성공:', data)
                    const { designerScheduleId } = data

                    // 🔹 세션에 designerScheduleId 저장
                    sessionStorage.setItem(
                        'designerScheduleId',
                        designerScheduleId.toString()
                    )
                    setIsBooking(true)
                },
                onError: (error) => handlePaymentError(error, '계좌이체'),
            })
        }
    }

    // ✅ 공통 에러 처리 함수
    const handlePaymentError = (error: unknown, method: string) => {
        const axiosError = error as AxiosError
        console.error(`❌ ${method} 결제 요청 실패:`, axiosError)

        if (axiosError.response) {
            console.error('🛑 서버 응답 데이터:', axiosError.response.data)
        } else {
            console.error('🛑 서버 응답이 없습니다. 요청이 실패했습니다.')
        }
    }

    // ✅ 예약 정보 전역 상태 연동
    const { reservationDate, reservationTime, isOnline, reservationTimeRaw } =
        useReservationStore()
    const chip = isOnline
        ? chips.find((chip) => chip.text === '온라인')
        : chips.find((chip) => chip.text === '직접')

    // ✅ 날짜와 시간 포맷팅
    const formattedDate = reservationDate
        ? dayjs(reservationDate).locale('ko-KR').format('MM.DD(ddd)')
        : ''
    const formattedTime = reservationTime ? reservationTime : ''

    // ✅ 디자이너 정보 받아오기
    const [designerInfo, setDesignerInfo] = useState({
        name: '박수연 실장',
        location: '준오헤어 반포점',
        rate: '4.7',
        comment: '가치를 높여주는 이상적인 스타일을 찾아드려요',
        price: { offline: '30,000', online: '20,000' },
    })

    //디자이너 id 받아오기
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const designerId = queryParams.get('id') || ''
    const designerData = useGetDesignerInfo(designerId)
    const [bannerUrl, setBannerUrl] = useState(
        `${import.meta.env.VITE_CLIENT_URL}/img/Banner.png`
    )

    useEffect(() => {
        if (designerData.isSuccess) {
            const data = designerData.data.data.data
            setDesignerInfo({
                name: data.designerName,
                location: data.designerShop,
                rate: '4.7',
                comment: data.designerDescription,
                price: {
                    offline: data.designerContactCost,
                    online: data.designerUntactCost,
                },
            })
            setBannerUrl(data.imageUrl)
        }
    }, [designerData.isSuccess])

    return (
        <div className='flex min-h-[100vh] w-full flex-col items-center bg-white'>
            {/* 상단 헤더 */}
            <div className='fixed top-0 flex w-full min-w-[375px] max-w-[480px] items-center justify-between bg-white px-[8px] py-[16px]'>
                <button
                    className='border-none bg-transparent p-[8px]'
                    onClick={() => window.history.back()}>
                    <div className='flex h-[24px] w-[24px] items-center justify-center bg-transparent'>
                        <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M15 5L8 12L15 19'
                                stroke='black'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                </button>
                <h2 className='text-[18px] font-semibold text-black'>
                    예약하기
                </h2>
                <div className='w-[24px]'></div>
            </div>

            {/* 본문 영역 */}
            <div className='mt-[64px] w-full max-w-[480px] px-[16px] pt-[16px]'>
                {/* 디자이너 정보 */}
                <div className='mb-[24px] h-[176px] w-full overflow-hidden rounded-[12px]'>
                    <img
                        src={bannerUrl}
                        alt='디자이너 이미지'
                        className='h-full w-full object-cover'
                    />
                </div>
            </div>

            <div className='w-full max-w-[480px] px-[20px]'>
                <h3 className='text-[24px] font-bold text-black'>
                    {designerInfo.name}
                </h3>
                <p className='text-[16px] text-black'>
                    {designerInfo.location}
                </p>

                {/* 일정 정보 */}
                <div className='mt-[8px] flex items-center gap-x-[24px] pb-[24px]'>
                    <p className='text-[16px] font-semibold text-gray-600'>
                        일정
                    </p>
                    <p className='text-[18px] font-semibold text-black'>
                        {formattedDate} {formattedTime}
                    </p>
                </div>

                {/* 구분선 */}
                <div className='relative mb-[28px] w-full'>
                    <div className='absolute left-0 w-full border-t-[1px] border-gray-400'></div>
                </div>

                {/* 결제 금액 */}
                <div className='flex w-full items-center justify-between pb-[48px]'>
                    <p className='text-[20px] font-bold text-gray-600'>
                        결제금액
                    </p>
                    <div className='flex items-center gap-x-[4px]'>
                        <span
                            className='mr-[6px] rounded-[6px] px-[8px] py-[4px] text-[12px] font-semibold'
                            style={{
                                backgroundColor: chip?.bg,
                                color: chip?.textColor,
                            }}>
                            {chip?.text}
                        </span>
                        <p className='text-[20px] font-bold text-purple-600'>
                            {isOnline
                                ? designerInfo.price.online
                                : designerInfo.price.offline}
                            원
                        </p>
                    </div>
                </div>
            </div>

            {/* 구분선 */}
            <div className='w-full border-t-[10px] border-gray-400'></div>

            {/* 본문 영역 */}
            <div className='w-full max-w-[480px] px-[20px] pb-[160px]'>
                {/* 정보 입력 폼 (컴포넌트 사용) */}
                <InfoForm request={request} setRequest={setRequest} />
            </div>

            {/* 결제 버튼 */}
            <div className='fixed bottom-0 left-0 right-0 mx-auto w-full min-w-[375px] max-w-[480px] bg-white'>
                {/* 구분선 */}
                <div className='absolute left-0 top-0 w-full border-t-[1px] border-gray-300'></div>

                {/* 버튼 영역 */}
                <div className='p-[16px]'>
                    <button
                        className='w-full rounded-[12px] bg-black py-[16px] text-[18px] font-semibold text-white'
                        onClick={() => setShowModal(true)}>
                        결제하고 예약 확정
                    </button>
                </div>
            </div>

            {/* 모달 표시 */}
            {showModal && <PaymentModal onClose={handlePaymentSelection} />}
        </div>
    )
}

export default PaymentTransfer
