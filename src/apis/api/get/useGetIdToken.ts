import { useQuery } from '@tanstack/react-query'
import { baseApi } from '../..'

export const useGetIdToken =(code:string)=>{
  return useQuery({queryKey:['idToken',code],queryFn: async () => {
    if(code==='') return null

    const res = await baseApi.get(`/auth/idtoken?code=${code}&logintype=google`)
    return res
  }})
}