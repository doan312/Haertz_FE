import { useMutation } from "@tanstack/react-query";
import { authApi } from "../..";

// ✅ 예약 삭제 API 호출 훅 (예약 ID 동적 전달 가능)
export const useDeleteBooking = () => {
    return useMutation({
        mutationFn: async ({ bookingId }: { bookingId: number }) => {
            const res = await authApi.delete(`/booking/${bookingId}`);
            return res.data;
        },
    });
};