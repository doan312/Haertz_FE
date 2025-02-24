import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import OnBoarding01 from '../../public/img/onboarding_1.png'
import OnBoarding02 from '../../public/img/onboarding_2.png'
import OnBoarding03 from '../../public/img/onboarding_3.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const onBoardingData = [
    {
        copy: (
            <>
                전문 헤어 디자이너가
                <br />
                찾아주는 나만을 위한
                <br />
                <span className='text-purple-600'>인생 헤어스타일</span>
            </>
        ),
        image: OnBoarding01,
    },
    {
        copy: (
            <>
                <span className='text-purple-600'>직접 만나거나</span>
                <br />
                <span className='text-purple-600'>편하게 온라인</span>으로
                <br />
                받는 1:1 헤어 컨설팅
            </>
        ),
        image: OnBoarding02,
    },
    {
        copy: (
            <>
                헤르츠와 함께하는
                <br />
                <span className='text-purple-600'>쉽고 스마트한</span>
                <br />
                <span className='text-purple-600'>헤어스타일 상담</span>
            </>
        ),
        image: OnBoarding03,
    },
]

const Onboarding: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [my_swiper, set_my_swiper] = useState<any>({})
    const navigate = useNavigate()

    const handleButtonClick = () => {
        if (currentIndex === 2) navigate('/')
        my_swiper.slideNext()
    }

    return (
        <div className='onboarding relative h-screen w-full bg-gray-100'>
            <Swiper
                slidesPerView={1}
                grabCursor={true}
                className='h-[calc(100vh-88px)]'
                modules={[Pagination]}
                pagination={{ clickable: true }}
                onInit={(ev) => {
                    set_my_swiper(ev)
                }}
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}>
                {onBoardingData.map((slide) => (
                    <SwiperSlide>
                        <div className='h-full overflow-hidden pt-57'>
                            <div className='flex flex-col items-center gap-22'>
                                <img
                                    src={slide.image}
                                    alt='온보딩'
                                    className='h-[329px] w-auto max-w-none shrink-0'
                                />
                                <h2 className='mx-30 inline-block self-start text-h1 font-bold text-gray-1300'>
                                    {slide.copy}
                                </h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='absolute bottom-0 left-0 right-0 h-88 border-t-1 border-t-gray-300 px-16 pb-30 pt-10'>
                <button
                    type='button'
                    onClick={handleButtonClick}
                    className={`flex h-48 w-full items-center justify-center rounded-10 bg-gray-1200 text-body1 font-medium text-gray-100`}>
                    {currentIndex === 2 ? '시작하기' : '다음'}
                </button>
            </div>
        </div>
    )
}

export default Onboarding
