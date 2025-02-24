import { useNavigate } from 'react-router-dom'
import BgImg from '../../../public/img/issue-bg.png'
import RefreshIcon from '../../../public/img/rotate.svg'

interface Props {
    type: 'notfound' | 'network'
}

export default function ErrorCover({ type }: Props) {
    const navigate = useNavigate()

    return (
        <div className='relative flex h-[534px] w-full items-center justify-center rounded-[12px]'>
            {type === 'notfound' ? (
                <span className='z-20 font-medium text-center text-purple-600 text-body1'>
                    조건에 맞는
                    <br />
                    디자이너를 찾지 못했어요
                </span>
            ) : (
                <div className='z-20 flex flex-col items-center gap-10'>
                    <span className='font-medium text-center text-purple-600 text-body1'>
                        조회가 되지 않았어요.
                        <br />
                        다시 시도해주세요.
                    </span>
                    <button
                        type='button'
                        onClick={() => navigate(0)}
                        className='flex items-center justify-center gap-4 px-10 py-5 text-gray-100 bg-purple-500 rounded-30 text-body2'>
                        <img src={RefreshIcon} alt='새로고침' />
                        새로고침
                    </button>
                </div>
            )}
            <img
                src={BgImg}
                alt='커버 배경 이미지'
                className='absolute inset-0 h-[534px] w-full'
            />
        </div>
    )
}
