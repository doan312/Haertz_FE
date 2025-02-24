interface Props {
    size: 'sm' | 'lg'
    imgUrl: string
}

export default function Profile({ size, imgUrl }: Props) {
    const style = size === 'lg' ? 'w-74 h-74' : 'w-44 h-44'
    return (
        <img
            src={imgUrl}
            alt='디자이너 프로필 이미지'
            className={`shrink-0 overflow-hidden rounded-82 border-[1.37px] border-gray-100/50 ${style}`}
        />
    )
}
