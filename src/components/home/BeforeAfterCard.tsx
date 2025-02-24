import { Link } from 'react-router-dom'
import Rating from './Rating'

interface Props {
    title: string
    designer: string
    rating: number
    review: string
    bgImg: string
}

export default function BeforeAfterCard({
    title,
    designer,
    rating,
    review,
    bgImg,
}: Props) {
    return (
        <Link
            to='#'
            className='relative h-[320px] w-[256px] shrink-0 overflow-hidden rounded-10'>
            <img src={bgImg} alt='비포애프터 이미지' />
            <div className='absolute bottom-0 left-0 right-0 flex flex-col w-full gap-13 px-14 pb-14'>
                <div className='flex flex-col'>
                    <span className='font-bold text-gray-100 text-h4'>
                        {title}
                    </span>
                    <div className='flex items-center gap-4 text-gray-100 text-body2'>
                        <span>{designer}</span>
                        <Rating rating={rating} textColor='white' />
                    </div>
                </div>
                <span className='line-clamp-2 text-caption text-[#e5e5e5]'>
                    {review}
                </span>
            </div>
        </Link>
    )
}
