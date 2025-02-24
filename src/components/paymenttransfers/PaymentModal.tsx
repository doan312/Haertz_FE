import React from "react";

interface PaymentModalProps {
  onClose: (paymentMethod: string | null) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => onClose(null)} // 빈 공간 클릭 시 선택 취소
    >
      <div
        className="bg-white rounded-[16px] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] p-[20px] w-[320px]"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 모달 닫힘 방지
      >
        <h3 className="text-[20px] font-bold text-center mb-[4px] text-black mt-[8px]">
          결제 방식 선택
        </h3>
        <h3 className="text-[16px] font-base text-center mb-[16px] text-black">
          결제 방식을 선택해 주세요.
        </h3>
        <div className="flex justify-between gap-[24px]">
          {/* 계좌 이체 버튼 */}
          <button
            className="w-[50%] px-[8px] py-[12px] bg-black font-semibold text-white rounded-[12px]"
            onClick={() => onClose("bankTransfer")}
          >
            계좌 이체
          </button>
          {/* 카카오페이 버튼 */}
          <button
            className="w-[50%] px-[16px] py-[12px] bg-black font-semibold text-white rounded-[12px]"
            onClick={() => onClose("kakaoPay")}
          >
            카카오페이
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;