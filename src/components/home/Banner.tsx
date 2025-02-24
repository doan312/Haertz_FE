interface Props {
    title: string
    subtitle: string
    bgColor: string
    imgUrl: string
    slide: string
}

export default function Banner({
    title,
    subtitle,
    bgColor,
    imgUrl,
    slide,
}: Props) {
    return (
        <div
            className={`relative flex h-170 w-[323px] justify-end overflow-hidden rounded-12 ${bgColor}`}>
            <img
                src={imgUrl}
                alt='배너 이미지'
                className='absolute bottom-0 right-0'
            />
            <div className='absolute bottom-0 left-0 right-0 flex flex-col items-start gap-5 pb-16 overflow-hidden text-left h-fit bg-gradient-to-b from-transparent to-black/60 px-18 pt-15'>
                <span className='font-semibold text-gray-100 whitespace-pre-wrap text-h3'>
                    {title}
                </span>
                <span className='text-gray-100 text-caption'>{subtitle}</span>
            </div>
            <div className='absolute flex items-center justify-center py-2 text-gray-100 bottom-16 right-16 h-fit rounded-12 bg-black/30 px-7 text-caption'>
                {slide}
            </div>
        </div>
    )
}
