import { create } from 'zustand'

interface ReservationCompleteState {
    bookingDate: string
    bookingTime: string
    bookingStatus: string
    paymentStatus: string
    meetingType: string
    requestDetails: string
    designerName: string
    setReservationCompleteData: (data: Partial<ReservationCompleteState>) => void
}

export const useReservationCompleteStore = create<ReservationCompleteState>((set) => ({
    bookingDate: '',
    bookingTime: '',
    bookingStatus: '',
    paymentStatus: '',
    meetingType: '',
    requestDetails: '',
    designerName: '',
    setReservationCompleteData: (data) => set((state) => ({ ...state, ...data })),
}))