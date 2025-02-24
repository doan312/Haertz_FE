import { useMutation } from "@tanstack/react-query";
import { authApi } from "../..";
import { useNavigate } from 'react-router-dom';
import { usePostBooking } from './usePostBooking';
import { useReservationCompleteStore } from '../../../store/useReservationCompleteStore';

// 카카오페이 승인 요청 타입 정의
interface KakaoPayApproveRequest {
    tid: string;
    designerScheduleId: string;
    pg_token: string;
}

// API 호출 훅
export const usePostKakaoPayApprove = () => {
    const navigate = useNavigate();
    const { mutate: postBooking } = usePostBooking() 
    const { setReservationCompleteData } = useReservationCompleteStore()

    return useMutation({
        mutationFn: async (data: KakaoPayApproveRequest) => {
            const res = await authApi.post("/kakaoPay/approve", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.data;
        },
        onSuccess: () => {
            //예약 처리
        const designerScheduleId = sessionStorage.getItem('designerScheduleId')

         // ✅ 예약 등록 요청 실행
            const bookingData = {
                designerScheduleId: Number(designerScheduleId),
                requestDetails: 'test 요청',
                meetingType: ('FACE_TO_FACE' as 'REMOTE' | 'FACE_TO_FACE')
            }

            postBooking(bookingData, {
                onSuccess: () => {
                    console.log('✅ 예약 등록 성공!')
                    setReservationCompleteData(bookingData)
                    navigate('/reservationcomplete')
                },
                onError: (error) => {
                    console.error('❌ 예약 등록 실패:', error)
                    navigate('/paymentfailed')
                },
            })
        
            navigate("/reservationcomplete");
        }
    });
};