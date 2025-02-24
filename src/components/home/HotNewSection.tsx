import { designersData } from '../../data/designers'
import HotNewCard from './HotNewCard'

export default function HotNewSection() {
    const hotNewDesigners = designersData.slice(0, 4)

    return (
        <section className='flex flex-col items-start'>
            <span className='font-bold text-black text-body1'>HOT & NEW</span>
            <div className='-ml-20 flex w-[calc(100%+40px)] gap-11 overflow-x-scroll'>
                <div className='w-9 shrink-0'></div>
                {hotNewDesigners.map((designer) => (
                    <HotNewCard {...designer} />
                ))}
                <div className='w-9 shrink-0'></div>
            </div>
        </section>
    )
}
