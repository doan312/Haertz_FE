import Profile from './Profile'
import DesignerImg13 from '../../../public/img/designer_image_13.png'
import { Link } from 'react-router-dom'

export default function RescheduleBanner() {
    return (
        <div className='-mx-4 mb-44 flex items-center justify-between gap-14 rounded-12 bg-purple-30 p-14 shadow-[0_1px_12px_rgba(0,0,0,0.08)]'>
            <div className='flex items-center gap-14'>
                <Profile size='sm' imgUrl={DesignerImg13} />
                <span className='font-medium text-gray-900 text-body2'>
                    만족하셨던{' '}
                    <span className='text-purple-500'>현영 디자이너</span> 님과
                    <br />
                    재예약은 어떠세요?
                </span>
            </div>
            <Link
                to='/designerdetail?id=6'
                className='flex items-center justify-center px-10 py-5 font-medium text-gray-100 bg-purple-500 rounded-50 text-body2'>
                재예약
            </Link>
        </div>
    )
}
