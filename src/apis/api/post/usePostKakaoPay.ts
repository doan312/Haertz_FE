import { useMutation } from "@tanstack/react-query";
import { authApi } from "../..";

// 카카오페이 결제 요청 타입 정의
interface KakaoPayRequest {
    designerId: number;
    bookingDate: string;
    bookingTime: string; // 변경됨 (문자열 타입)
    item_name: string;
    quantity: number; // 변경됨 (숫자 타입)
    total_amount: number; // 변경됨 (숫자 타입)
    tax_free_amount: number; // 변경됨 (숫자 타입)
}

export const usePostKakaoPay = () => {
    return useMutation({
        mutationFn: async (data: KakaoPayRequest) => {
            const res = await authApi.post("/kakaoPay", {
                ...data,
                approval_url: "https://haertz.kr/kakaoPaySuccess", // ✅ 원하는 승인 URL로 변경
                cancel_url: "https://haertz.kr/kakaoPayCancel",
                fail_url: "https://haertz.krkakaoPayFail",
            });
            return res.data;
        },
    });
};