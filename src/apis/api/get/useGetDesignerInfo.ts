import { useQuery } from '@tanstack/react-query'
import { authApi } from '../..'

export const useGetDesignerInfo =(designerId:string)=>{
  return useQuery({queryKey:['designerInfo',designerId],queryFn: async () => {
    const res = await authApi.get(`/designer/${designerId}`)
    return res
  }})
}
