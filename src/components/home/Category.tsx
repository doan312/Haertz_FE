import { TagType } from '../../types/designerTypes'

const valuesDict = {
    REMOTE: {
        text: '온라인',
        textColor: 'text-TXT-blue',
        bgColor: 'bg-BG-blue',
    },
    FACE_TO_FACE: {
        text: '직접',
        textColor: 'text-TXT-pink',
        bgColor: 'bg-BG-pink',
    },
    DYEING: {
        text: '염색',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-300',
    },
    BLEACH: {
        text: '탈염색',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-300',
    },
    PERM: {
        text: '펌',
        textColor: 'text-gray-700',
        bgColor: 'bg-gray-300',
    },
}

interface Props {
    value: TagType
}

export default function Category({ value }: Props) {
    const { text, textColor, bgColor } = valuesDict[value]

    return (
        <div
            className={`flex w-fit items-center justify-center rounded-4 px-5 py-2 text-caption font-medium ${textColor} ${bgColor}`}>
            {text}
        </div>
    )
}
