import { Link } from 'react-router-dom'
import LogoIcon from '../../../public/img/logo.svg'
import { useEffect, useState } from 'react'

export default function Logo() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <Link
            to='/'
            className={`fixed left-0 right-0 top-0 z-50 mx-auto flex h-57 w-full min-w-[375px] max-w-[480px] cursor-pointer flex-col justify-center px-[16.5px] transition-all duration-300 ${
                isScrolled
                    ? 'bg-white bg-opacity-50 backdrop-blur-[30px]'
                    : 'bg-transparent'
            }`}>
            <img src={LogoIcon} alt='로고 아이콘' className='self-start h-24' />
        </Link>
    )
}
