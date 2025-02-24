import { useQuery } from '@tanstack/react-query'
import { authApi } from '../..'

export const useGetAvailableTimes =(designerId:string,date:string)=>{
  return useQuery({queryKey:['availableTimes',date],queryFn: async () => {
    const res = await authApi.get(`/booking/available-times?designerId=${designerId}&bookingDate=${date}`)
    return res
  }})
}
