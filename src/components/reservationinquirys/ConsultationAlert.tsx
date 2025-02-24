import React from "react";

interface ConsultationAlertProps {
  designerName: string;
  consultationType: string;
  profileImage: string;
}

const ConsultationAlert: React.FC<ConsultationAlertProps> = ({
  designerName,
  consultationType,
  profileImage,
}) => {
  return (
    <div className="flex items-center gap-[16px] p-[16px] rounded-[16px] bg-purple-100 bg-opacity-40 w-full max-w-[480px]">
      {/* 디자이너 프로필 이미지 */}
      <img
        src={profileImage}
        alt="디자이너"
        className="w-[48px] h-[48px] rounded-full border-[1px] border-gray-300 mr-[8px]"
      />

      {/* 텍스트 영역 */}
      <div className="flex-1">
        <p className="text-[16px] font-semibold text-purple-600">
          {designerName}
          <span className="text-black"> 님과의 </span>
          <span className="text-black">{consultationType}</span>
          <span className="text-black"> 컨설팅이 다가오고 있어요!</span>
        </p>
      </div>
    </div>
  );
};

export default ConsultationAlert;