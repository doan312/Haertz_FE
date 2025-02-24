import { useQuery } from '@tanstack/react-query'
import { authApi } from '../..'

// 과거 예약 정보 타입 정의
export interface PastBookingResponse {
    designerScheduleId: number
    requestDetails: string
    meetingType: 'REMOTE' | 'FACE_TO_FACE' // ENUM 타입 지정
}

// API 호출 훅
export const useGetPastBooking = () => {
    return useQuery<PastBookingResponse[]>({
        queryKey: ['pastBooking'], // React Query 캐싱 키
        queryFn: async () => {
            const res = await authApi.get('/booking/past') // ✅ GET 요청
            return res.data.data
        },
        staleTime: 1000 * 60 * 5, // 5분 동안 캐싱된 데이터 유지
    })
}
