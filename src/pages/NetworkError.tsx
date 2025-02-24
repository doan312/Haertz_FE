import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotFoundSVG from '../assets/icons/Network.svg' // SVG 파일 추가s
import Logo from '../components/home/Logo'

const NetworkError: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className='flex min-h-[100vh] flex-col items-center justify-center bg-white'>
            {/* 상단 고정 헤더 */}
            <Logo />

            {/* 중앙 콘텐츠 (SVG 이미지 + 텍스트 + 버튼) */}
            <div className='flex flex-col items-center justify-center'>
                {/* SVG 이미지 */}
                <img
                    src={NotFoundSVG}
                    alt='페이지를 찾을 수 없음'
                    className='mb-[16px] h-[96px] w-[96px]'
                />

                {/* 안내 문구 */}
                <p className='mb-[8px] text-[14px] text-gray-700'>
                    인터넷 연결을 확인해보세요
                </p>

                {/* 새로고침 버튼 */}
                <button
                    className='bg-transparent text-[18px] font-medium text-[#7E57C2] hover:underline'
                    onClick={() => navigate(0)}>
                    새로고침
                </button>
            </div>
        </div>
    )
}

export default NetworkError
