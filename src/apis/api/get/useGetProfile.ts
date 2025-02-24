import { useQuery } from '@tanstack/react-query'
import { authApi } from '../..'

export const useGetProfile =()=>{
  return useQuery({queryKey:['profile'],queryFn: async () => {
    const res = await authApi.get(`/user/profile`)
    return res
  }})
}