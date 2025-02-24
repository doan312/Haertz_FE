import InPersonIcon from '../../../public/img/in-person.svg'
import OnlineIcon from '../../../public/img/online.svg'
import { useHomeStore } from '../../store/useStore'
import { MeetingMode } from '../../types/designerTypes'

const methodData = {
    FACE_TO_FACE: {
        copy: '디자이너와\n직접 만나서',
        price: 30000,
        icon: InPersonIcon,
    },
    REMOTE: {
        copy: '편하게\n온라인으로',
        price: 20000,
        icon: OnlineIcon,
    },
}

interface Props {
    mode: Omit<MeetingMode, 'BOTH'>
}

export default function MethodSelectionCard({ mode }: Props) {
    const { meetingMode, setMeetingMode } = useHomeStore()
    const { copy, price, icon } = methodData[mode as keyof typeof methodData]
    const isActive = mode === meetingMode

    return (
        <button
            type='button'
            className={`gradient-border relative h-150 w-166 grow rounded-lg p-14 transition duration-200 ease-in-out ${isActive ? 'bg-purple-50' : 'bg-gray-100'}`}
            onClick={() => {
                setMeetingMode(mode as keyof typeof methodData)
            }}>
            <div className='flex flex-col justify-between h-full text-left'>
                <span className='font-bold text-purple-800 whitespace-pre-wrap text-h4'>
                    {copy}
                </span>
                <div className='flex items-center gap-2 text-caption text-gray-1300'>
                    <span className='font-bold text-body2'>
                        {`${price.toLocaleString('ko-KR')}원`}
                    </span>
                    <span>부터</span>
                </div>
            </div>
            <img
                src={icon}
                alt={`${meetingMode} 아이콘`}
                className='absolute bottom-0 right-0'
            />
        </button>
    )
}
