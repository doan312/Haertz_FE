import { useMutation } from "@tanstack/react-query";
import { authApi } from "../..";

// 예약 요청 타입 정의
interface BookingRequest {
    designerScheduleId: number;
    requestDetails: string;
    meetingType: "REMOTE" | "FACE_TO_FACE"; // ENUM 타입 지정
}

// API 호출 훅
export const usePostBooking = () => {
    return useMutation({
        mutationFn: async (data: BookingRequest) => {
            const res = await authApi.post("/booking", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.data;
        },
    });
};