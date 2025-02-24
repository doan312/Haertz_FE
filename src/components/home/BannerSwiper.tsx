import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Banner from './Banner'
import { Autoplay } from 'swiper/modules'
import BannerImage01 from '../../../public/img/banner_image_01.png'
import BannerImage02 from '../../../public/img/banner_image_02.png'
import BannerImage03 from '../../../public/img/banner_image_03.png'
import BannerImage04 from '../../../public/img/banner_image_04.png'

const bannerData = [
    {
        title: '처음 만나는\n특별한 변신의 순간',
        subtitle: '첫 방문 컨설팅 + 시술 패키지 30% 할인',
        bgColor: 'bg-BN-pink',
        imgUrl: BannerImage01,
    },
    {
        title: '함께해서\n더 특별한 순간',
        subtitle: '친구 추천 시 추가 15% 할인 혜택',
        bgColor: 'bg-BN-blue',
        imgUrl: BannerImage02,
    },
    {
        title: '계절에 맞는\n트렌디한 변신',
        subtitle: '계절 맞춤 헤어케어 제품 샘플링 제공',
        bgColor: 'bg-BN-green',
        imgUrl: BannerImage03,
    },
    {
        title: '스타일 변신을\n응원해요',
        subtitle: 'SNS 후기 작성 시 다음 방문 25% 할인',
        bgColor: 'bg-SR-yellow',
        imgUrl: BannerImage04,
    },
]

export default function BannerSwiper() {
    return (
        <div className='banner-swiper -ml-20 mb-44 w-[calc(100%+40px)]'>
            <Swiper
                spaceBetween={12}
                slidesPerView='auto'
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}>
                {bannerData.map((banner, idx) => (
                    <SwiperSlide>
                        <Banner
                            {...banner}
                            slide={`${idx + 1}/${bannerData.length}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
