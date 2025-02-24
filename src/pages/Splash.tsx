import React from 'react'
import SplashLogo from '../assets/icons/spalsh.svg'

const Splash: React.FC = () => {
    return (
        <div className='flex min-h-[100vh] flex-col items-center justify-center bg-purple-400'>
            {/* 중앙 콘텐츠 (SVG 이미지 + 텍스트 + 버튼) */}
            <div className='flex flex-col items-center justify-center'>
                {/* SVG 이미지 */}
                <img
                    src={SplashLogo}
                    alt='스플래쉬'
                    className='mb-[16px] h-[120px] w-[250px]'
                />
            </div>
        </div>
    )
}

export default Splash
