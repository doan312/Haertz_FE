import { useQuery } from '@tanstack/react-query'
import { authApi } from '../..'

export const useGetAvailableDates =(designerId:string)=>{
  return useQuery({queryKey:['availableDates'],queryFn: async () => {
    const res = await authApi.get(`/booking/available-dates?designerId=${designerId}`)
    return res
  }})
}
