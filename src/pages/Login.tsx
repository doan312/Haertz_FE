import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetIdToken } from '../apis/api/get/useGetIdToken'
import { useLogin } from '../apis/api/post/useLogin'
import { Loading } from './Loading'

const Login: React.FC = () => {
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_LOGIN_REDIRECT_URI}&scope=openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code`
    const location = useLocation()
    const [code, setCode] = useState('')
    //로그인 api 호출
    const res = useGetIdToken(code)
    const login = useLogin()

    const handleGoogleLogin = () => {
        window.location.href = googleLoginUrl
    }

    //로그인 callback처리
    useEffect(() => {
        if (location.search.includes('code')) {
            setCode(location.search.split('=')[1])
        }
    }, [location])

    //idToken 받아오기
    useEffect(() => {
        if (res.isSuccess && res.data !== null) {
            login.mutate(res.data.data.data.idToken) //로그인 or 회원가입 처리
        }
    }, [res.isSuccess])

    //로그인 로딩 화면
    if (code !== '') {
        return <Loading />
    }

    //랜딩 화면
    return (
        <div className='relative flex h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#d8c4fc] to-white'>
            <div className='flex flex-col items-center justify-center gap-[1rem]'>
                <img
                    src={'/img/Logo-l.svg'}
                    alt='logo'
                    className='relative h-[2.1876rem] object-cover'
                />
                <div className="font-['Bellota Text'] text-base font-normal text-[#894ef7]">
                    Style That Speaks, Beauty That Lasts
                </div>
            </div>

            <div className='flex w-full flex-col items-center justify-center px-4'>
                <button
                    onClick={handleGoogleLogin}
                    className='absolute bottom-[1.88rem] flex h-[3rem] w-[90%] flex-row items-center justify-center gap-[0.25rem] rounded-[0.625rem] bg-gray-1300 text-gray-100'>
                    <img src={'/img/google.svg'} alt='google' />
                    <span className='text-body1 font-normal'>
                        구글로 시작하기{' '}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Login
