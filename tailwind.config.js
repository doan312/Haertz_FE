/** @type {import('tailwindcss').Config} */

const px0_10 = Object.fromEntries(
    Array.from({ length: 11 }, (_, i) => [i.toString(), `${i}px`])
)
const px0_100 = Object.fromEntries(
    Array.from({ length: 101 }, (_, i) => [i.toString(), `${i}px`])
)
const px0_200 = Object.fromEntries(
    Array.from({ length: 201 }, (_, i) => [i.toString(), `${i}px`])
)

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'purple-30': '#EEE5FF',
                'purple-50': '#D8C4FC',
                'purple-100': '#CDB3FB',
                'purple-200': '#B691FA',
                'purple-300': '#A070F8',
                'purple-400': '#894EF7',
                'purple-500': '#732CF5',
                'purple-600': '#6125CE',
                'purple-700': '#4E1EA7',
                'purple-800': '#3C177F',
                'purple-900': '#291058',
                'gray-100': '#FFFFFF',
                'gray-200': '#FAFAFA',
                'gray-300': '#F5F5F5',
                'gray-400': '#F0F0F0',
                'gray-500': '#D9D9D9',
                'gray-600': '#BFBFBF',
                'gray-700': '#8C8C8C',
                'gray-800': '#595959',
                'gray-900': '#434343',
                'gray-1000': '#262626',
                'gray-1100': '#1F1F1F',
                'gray-1200': '#141414',
                'gray-1300': '#111111',
                'BN-pink': '#FFA3A5',
                'BN-blue': '#C7E3FF',
                'BN-green': '#C6D96F',
                'BN-yellow': '#FFDC6B',
                'SR-yellow': '#FFB731',
                'BG-blue': '#ECEFFF',
                'TXT-blue': '#6173FD',
                'BG-pink': '#FFECEC',
                'TXT-pink': '#FA95A2',
            },
            fontSize: {
                h1: ['32px', { lineHeight: '140%', letterSpacing: '-0.5%' }],
                h2: ['24px', { lineHeight: '140%', letterSpacing: '-0.5%' }],
                h3: ['20px', { lineHeight: '140%', letterSpacing: '-0.5%' }],
                h4: ['18px', { lineHeight: '140%', letterSpacing: '-0.5%' }],
                body1: ['16px', { lineHeight: '140%', letterSpacing: '-0.5%' }],
                body2: ['14px', { lineHeight: '140%', letterSpacing: '-0.5%' }],
                caption: [
                    '12px',
                    { lineHeight: '140%', letterSpacing: '-0.5%' },
                ],
                ...px0_100,
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },
            borderWidth: px0_10,
            borderRadius: px0_100,
            lineHeight: px0_100,
            minWidth: px0_200,
            minHeight: px0_200,
            maxWidth: px0_200,
            maxHeight: px0_200,
            width: px0_200,
            height: px0_200,
            spacing: px0_200,
            inset: px0_100,
            gap: px0_100,
            backgroundImage: {
                'gradient-to-t':
                    'linear-gradient(to top, rgba(75, 75, 75, 0) 0%, rgba(120, 120, 120, 1) 100%)',
            },

            animation: {
                'bounce-once': 'bounce 1s infinite 5s', // 5초마다 바운스 애니메이션 실행
            },
            keyframes: {
                bounce: {
                    '0%, 100%': {
                        transform: 'translateY(-25%)',
                        animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
                    },
                    '50%': {
                        transform: 'none',
                        animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
                    },
                },
            },

            rotate: {
                180: '-180deg', // 180도 회전
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 1s ease-out',
                'bounce-200': 'bounce 1s infinite 200ms', // 200ms 지연
                'bounce-400': 'bounce 1s infinite 400ms', // 400ms 지연
                'bounce-600': 'bounce 1s infinite 600ms', // 600ms 지연
                'bounce-800': 'bounce 1s infinite 800ms', // 800ms 지연
                'slide-out': 'slideOut 1s forwards',
                'slide-in': 'slideIn 1s forwards',
            },
            // 키프레임 정의 추가
            keyframes: {
                slideOut: {
                    from: { opacity: 1, transform: 'translateX(0%)' },
                    to: { opacity: 0, transform: 'translateX(-100%)' },
                },
                slideIn: {
                    from: { opacity: 0, transform: 'translateX(100%)' },
                    to: { opacity: 1, transform: 'translateX(0%)' },
                },
            },
            screens: {
                custom: '923px', // Adds a custom breakpoint at 1023px
            },
            boxShadow: {
                'slider': '0px 1px 5px 0px rgba(18, 19, 21, 0.10), 0px 2px 10px 0px rgba(18, 19, 21, 0.03)', 
            },    
        },
    },
    plugins: [],
}