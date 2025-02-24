import Category from './Category'
import ArrowIcon from '../../../public/img/arrow-right.svg'
import Rating from './Rating'
import Profile from './Profile'
import { Link } from 'react-router-dom'
import { Designer, TagType } from '../../types/designerTypes'
import { designerDict } from '../../data/designers'

export default function DesignerCard(props: Designer) {
    const {
        designerId,
        designerName,
        meetingMode,
        designerSpecialty,
        imageUrl,
    } = props

    const tagList: TagType[] =
        meetingMode === 'BOTH'
            ? ['FACE_TO_FACE', 'REMOTE', designerSpecialty]
            : [meetingMode, designerSpecialty]

    const { shop, rating } = designerDict[designerName]

    return (
        <Link
            to={`/designerdetail?id=${designerId}`}
            className='flex w-full items-center gap-14 rounded-12 bg-gray-100 px-12 py-10 shadow-[0_1px_12px_rgba(0,0,0,0.08)]'>
            <Profile size='lg' imgUrl={imageUrl} />
            <div className='flex flex-col items-start gap-6 grow'>
                <div className='flex flex-col items-start'>
                    <div className='flex items-center justify-center gap-6'>
                        <span className='font-semibold text-body1 text-gray-1300'>
                            {designerName}
                        </span>
                        <Rating rating={rating} textColor='black' />
                    </div>
                    <span className='text-body2 text-[#939393]'>{shop}</span>
                </div>
                <div className='flex gap-4'>
                    {tagList.map((tag) => (
                        <Category key={tag} value={tag} />
                    ))}
                </div>
            </div>
            <img src={ArrowIcon} alt='오른쪽 화살표 아이콘' />
        </Link>
    )
}
