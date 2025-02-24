import { create } from 'zustand'

interface ReservationState {
    designerId: string
    reservationDate: Date | null
    reservationTime: string | null
    reservationTimeRaw: string | null
    isOnline: boolean
    setDesignerId: (id: string) => void
    setReservationDate: (date: Date | null) => void
    setReservationTime: (time: string | null) => void
    setReservationTimeRaw: (time: string | null) => void
    setIsOnline: (isOnline: boolean) => void
}

export const useReservationStore = create<ReservationState>((set) => ({
    designerId: '1',
    reservationDate: null,
    reservationTime: null,
    reservationTimeRaw: null,
    isOnline: false,
    setDesignerId: (id) => set({ designerId: id }),
    setReservationDate: (date) => set({ reservationDate: date, reservationTime: null }),
    setReservationTime: (time) => set({ reservationTime: time }),
    setReservationTimeRaw: (time) => set({ reservationTimeRaw: time }),
    setIsOnline: (isOnline) => set({ isOnline }),
}))

// 상태 변경을 감지하고 콘솔에 로그를 출력하는 함수
const logStateChanges = () => {
    const { designerId, reservationDate, reservationTime, isOnline } = useReservationStore.getState()
    console.log('State changed:', { designerId, reservationDate, reservationTime, isOnline })
}

// 상태 변경을 구독
useReservationStore.subscribe(logStateChanges)
