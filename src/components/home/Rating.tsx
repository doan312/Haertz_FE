import StarIcon from '../../../public/img/star-sm.svg'

interface Props {
    rating: number
    textColor?: 'white' | 'black'
}

export default function Rating({ rating, textColor = 'black' }: Props) {
    const style = textColor === 'white' ? 'text-gray-100' : 'text-gray-1300'

    return (
        <div className='flex items-center gap-2'>
            <img src={StarIcon} alt='별 아이콘' />
            <span className={`text-caption ${style}`}>{rating}</span>
        </div>
    )
}
