import { useQuery } from '@tanstack/react-query'
import { authApi } from '../..'
import { DesignerListResponse } from '../../../types/designerTypes'
import { Filter } from '../../../store/useStore'
import qs from 'qs'

export const useGetDesignerList = (filter: Filter) => {
    return useQuery<DesignerListResponse>({
        queryKey: ['designers', JSON.stringify(filter)],
        queryFn: async () => {
            const params = { ...filter }

            // meetingMode가 null 또는 undefined일 때만 제거
            if (params.meetingMode == null) {
                delete params.meetingMode
            }

            // district가 null이면 district만 삭제해야 함 (meetingMode가 아니라)
            if (params.district == null) {
                delete params.district
            }

            // page 기본값 설정
            params.page = params.page ?? 0

            const res = await authApi.get<DesignerListResponse>(
                '/designer/filter',
                {
                    params,
                    paramsSerializer: (params) =>
                        qs.stringify(params, { arrayFormat: 'repeat' }),
                }
            )

            return res.data
        },
    })
}
