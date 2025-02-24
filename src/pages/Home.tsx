// 홈 화면

import React, { useEffect } from 'react'
import Logo from '../components/home/Logo'
import MainSection from '../components/home/MainSection'
import RescheduleBanner from '../components/home/RescheduleBanner'
import HotNewSection from '../components/home/HotNewSection'
import BeforeAfterSection from '../components/home/BeforeAfterSection'
import TabBar from '../components/TabBar/TabBar'
import BannerSwiper from '../components/home/BannerSwiper'
import { useAccessTokenStore } from '../store/useStore'
import {
    PastBookingResponse,
    useGetPastBooking,
} from '../apis/api/get/useGetPastBooking'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
    const { data: pastBookingData } = useGetPastBooking()
    const pastBooking: PastBookingResponse[] = pastBookingData || []

    //사용자 로그인 여부에 따른 화면 분기처리
    const { accessToken } = useAccessTokenStore()
    const navigate = useNavigate()
    useEffect(() => {
        if (!accessToken) {
            navigate('/login')
        }
    }, [accessToken])

    return (
        <div className='relative z-0 w-full overflow-hidden bg-gray-100 px-20 pb-155'>
            <div className='absolute left-0 right-0 top-0 -z-20 -m-16 h-[852px] bg-gradient-to-b from-[#E8DCFD] to-transparent'></div>
            <Logo />
            <MainSection />
            <BannerSwiper />
            {!pastBooking || pastBooking.length ? <RescheduleBanner /> : <></>}
            <HotNewSection />
            <BeforeAfterSection />
            <TabBar />
        </div>
    )
}

export default Home
