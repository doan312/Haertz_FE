import { beforeAfterData } from '../../data/portfolio'
import BeforeAfterCard from './BeforeAfterCard'
import { useLocation } from 'react-router-dom'

export default function BeforeAfterSection() {
    const { pathname } = useLocation()

    return (
        <section className='flex flex-col items-start gap-14'>
            <span className='font-bold text-black text-body1'>
                {pathname === '/' ? '디자인 포트폴리오' : '포트폴리오'}
            </span>
            <div className='flex w-screen gap-12 -ml-20 overflow-x-scroll'>
                <div className='w-8 shrink-0'></div>
                {beforeAfterData.map((card) => (
                    <BeforeAfterCard {...card} />
                ))}
                <div className='w-8 shrink-0'></div>
            </div>
        </section>
    )
}
