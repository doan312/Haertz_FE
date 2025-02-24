import { Link, useLocation } from 'react-router-dom' // 페이지 이동을 위한 useNavigate 추가
import HomeActiveIcon from '../../../public/img/home-active.svg'
import HomeInactiveIcon from '../../../public/img/home-inactive.svg'
import ReservationActiveIcon from '../../../public/img/reservation-active.svg'
import ReservationInactiveIcon from '../../../public/img/reservation-inactive.svg'
import { TabType } from './TabBar'
import { useState } from 'react'

interface Props {
    type: TabType
}

// 탭 데이터 (페이지 경로 추가)
const tabItemData = {
    home: {
        text: '상담 예약',
        activeIcon: HomeActiveIcon,
        inactiveIcon: HomeInactiveIcon,
        path: '/', // 홈 페이지 경로
    },
    reservation: {
        text: '예약 조회',
        activeIcon: ReservationActiveIcon,
        inactiveIcon: ReservationInactiveIcon,
        path: '/reservationinquiry', // 예약 조회 페이지 경로
    },
}

export default function TabItem({ type }: Props) {
    const { pathname } = useLocation()
    const [currentTab, setCurrentTab] = useState<TabType>(
        pathname === '/' ? 'home' : 'reservation'
    )
    const isActive = currentTab === type
    const { activeIcon, inactiveIcon, path } = tabItemData[type]

    return (
        <Link
            to={path}
            className='flex flex-col items-center gap-[4px] bg-transparent'
            onClick={() => setCurrentTab(type)}>
            <img
                src={isActive ? activeIcon : inactiveIcon}
                alt='탭 아이콘'
                className='h-[24px] w-[24px]'
            />
            <span
                className={`text-[14px] font-medium ${
                    isActive ? 'font-bold text-purple-500' : 'text-[#ADB5BD]'
                }`}>
                {tabItemData[type].text}
            </span>
        </Link>
    )
}
