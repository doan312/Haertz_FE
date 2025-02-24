import React, { useEffect, useState } from 'react'
import { useReservationStore } from '../../store/useReservationStore'
import { SlArrowLeft } from 'react-icons/sl'
import { IconContext } from 'react-icons'
import DesignerInfo from '../../components/designerDetail/DesignerInfo'
import Reservation from '../../components/designerDetail/Reservation'
import Divider from '../../components/designerDetail/Divider'
import ButtonLg from '../../components/designerDetail/ButtonLg'
import BeforeAfterSection from '../../components/home/BeforeAfterSection'
import FadePopup from '../../components/reservationcompletes/FadePopup'
import { useGetDesignerInfo } from '../../apis/api/get/useGetDesignerInfo'
import { useLocation } from 'react-router-dom'

const DesignerDetail: React.FC = () => {
    const { reservationTime } = useReservationStore()
    const [isButtonVisible, setIsButtonVisible] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const designerId = queryParams.get('id') || ''

    const handleScroll = () => {
        const bannerHeight = window.innerHeight * 0.25
        if (window.scrollY > bannerHeight) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }

    const handleCopyLoc = (shop: string) => {
        navigator.clipboard.writeText(shop)
        setShowPopup(true)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        if (reservationTime !== null) {
            setIsButtonVisible(true)
        } else {
            setIsButtonVisible(false)
        }
    }, [reservationTime])

    const handleBack = () => {
        window.history.back()
    }

    //디자이너 이미지 & 온라인여부 받아오기
    const designerData = useGetDesignerInfo(designerId)
    const [isBoth, setIsBoth] = useState(true)
    const [bannerUrl, setBannerUrl] = useState(
        `${import.meta.env.VITE_CLIENT_URL}/img/Banner.png`
    )
    const { setIsOnline } = useReservationStore()
    useEffect(() => {
        if (designerData.isSuccess) {
            const data = designerData.data.data.data
            const meetingMode = data.meetingMode
            setBannerUrl(data.imageUrl)

            setIsBoth(meetingMode === 'BOTH' || meetingMode == null)
            if (meetingMode === 'REMOTE') {
                setIsOnline(true)
            } else if (meetingMode === 'FACE_TO_FACE') {
                setIsOnline(false)
            }
        }
    }, [designerData.isSuccess])

    return (
        <div className='flex flex-col items-center overflow-hidden'>
            <IconContext.Provider value={{}}>
                <div
                    className={`fixed left-0 right-0 top-0 z-50 mx-auto flex h-57 w-full min-w-[375px] max-w-[480px] items-center px-16 ${isScrolled ? 'bg-gray-100' : 'bg-transparent'}`}>
                    <SlArrowLeft
                        color={isScrolled ? 'black' : 'white'}
                        onClick={handleBack}
                        className='h-16'
                    />
                </div>
            </IconContext.Provider>
            <img
                src={bannerUrl}
                alt='designer'
                className='relative h-[16rem] w-full object-cover'
            />

            <div className='relative z-10 -mt-20 w-[100%] flex-auto rounded-t-2xl bg-white pb-10 shadow-md'>
                <DesignerInfo
                    handleCopyLoc={handleCopyLoc}
                    designerId={designerId}
                />
                <Divider />
                <Reservation isBoth={isBoth} />
                <Divider />
                <div className='px-20 pb-52 pt-38'>
                    <BeforeAfterSection />
                </div>
                {/* 페이드인 팝업 */}
                <FadePopup
                    show={showPopup}
                    message='주소가 복사됐어요'
                    onClose={() => {
                        setShowPopup(false)
                    }}
                />
                <ButtonLg
                    text='예약'
                    available={isButtonVisible}
                    designerId={designerId}
                />
            </div>
        </div>
    )
}

export default DesignerDetail
