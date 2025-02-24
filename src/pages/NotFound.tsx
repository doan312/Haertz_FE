import React from "react";
import { useNavigate } from "react-router-dom";
import NotFoundSVG from "../assets/icons/notfound.svg"; // SVG 파일 추가
import Header from "../utils/Header"; // 헤더 컴포넌트 import

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-white">
      {/* 상단 고정 헤더 */}
      <Header />

      {/* 중앙 콘텐츠 (SVG 이미지 + 텍스트 + 버튼) */}
      <div className="flex flex-col items-center justify-center">
        {/* SVG 이미지 */}
        <img src={NotFoundSVG} alt="페이지를 찾을 수 없음" className="w-[96px] h-[96px] mb-[16px]" />

        {/* 안내 문구 */}
        <p className="text-gray-700 text-[14px] mb-[8px]">
          잘못된 접근이거나 요청하신<br /> 페이지를 찾을 수 없습니다.
        </p>

        {/* 홈으로 이동 버튼 */}
        <button
          className="text-[#7E57C2] bg-transparent font-medium text-[18px] hover:underline"
          onClick={() => navigate("/")} // "/"는 홈으로 이동
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
};

export default NotFound;