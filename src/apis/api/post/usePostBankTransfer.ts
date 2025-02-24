import { useMutation } from "@tanstack/react-query";
import { authApi } from "../..";

// 계좌이체 요청 타입 정의
interface BankTransferRequest {
    designerId: number;
    bookingDate: string;
    bookingTime: string; // 변경됨 (문자열 타입)
    item_name: string;
    quantity: number; // 변경됨 (숫자 타입)
    total_amount: number; // 변경됨 (숫자 타입)
    tax_free_amount: number; // 변경됨 (숫자 타입)
}

// API 호출 훅
export const usePostBankTransfer = () => {
    return useMutation({
        mutationFn: async (data: BankTransferRequest) => {
            const res = await authApi.post("/banktransfer", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.data;
        },
    });
};