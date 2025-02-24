import React from "react";
import ReservationCard from "./ReservationCard";

interface Reservation {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  status: "결제 완료" | "입금 확인중" | "상담 완료" | "상담 취소";
  online: boolean;
  type: "직접" | "온라인";
}

interface Props {
  reservations: Reservation[];
  title: string;
}

const ReservationList: React.FC<Props> = ({ reservations, title }) => {
  if (reservations.length === 0) {
    return <p className="text-center text-gray-500">{title} 내역이 없습니다.</p>;
  }

  return (
    <section>
      <h3 className="text-[19px] font-bold mb-[8px] text-black">{title}</h3>
      {reservations.map((res) => (
        <ReservationCard key={res.id} reservation={res} />
      ))}
    </section>
  );
};

export default ReservationList;