import ArrowIcon from '../../../public/img/arrow-down.svg'
import { useHomeStore } from '../../store/useStore'

interface Props {
    disabled: boolean
}

export default function Button({ disabled }: Props) {
    const { addDisplayCount } = useHomeStore()

    return (
        <button
            type='button'
            disabled={disabled}
            onClick={addDisplayCount}
            className='flex h-46 w-full items-center justify-center gap-5 rounded-12 bg-[#f6f6f6] px-12 py-10'>
            <span className='text-body2 text-gray-1000'>더보기</span>
            <img src={ArrowIcon} alt='화살표 아이콘' className='px-3 pb-5' />
        </button>
    )
}
