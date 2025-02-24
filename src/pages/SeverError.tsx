import React from 'react'
import NotFoundSVG from '../assets/icons/Online.svg' // SVG 파일 추가
import Logo from '../components/home/Logo'

const ServerError: React.FC = () => {
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
                <p className='text-[14px] text-gray-700'>
                    서버에 오류가 발생하였습니다
                </p>

                {/* 안내 문구 */}
                <p className='mb-[8px] text-[14px] text-gray-700'>
                    잠시 후 다시 접속해주세요
                </p>
            </div>
        </div>
    )
}

export default ServerError
