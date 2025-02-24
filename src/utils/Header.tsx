import React from 'react'
import Logo from '../assets/Logo.svg' // 로고 파일 import

const Header: React.FC = () => {
    return (
        <header className='fixed left-0 right-0 top-0 z-50 mx-auto flex w-full min-w-[375px] max-w-[480px] items-center bg-white px-[16px] py-[24px]'>
            <img src={Logo} alt='로고' className='h-[24px]' />{' '}
            {/* 로고 왼쪽 정렬 */}
        </header>
    )
}

export default Header
