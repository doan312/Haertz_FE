type MeetingModeType = 'REMOTE' | 'FACE_TO_FACE'
export type SpecialtyType = 'BLEACH' | 'DYEING' | 'PERM'
export type SpecialtyChipType = SpecialtyType | 'ALL'
export type TagType = MeetingModeType | SpecialtyType

export interface Designer {
    createdDate: string | null
    modifiedDate: string | null
    designerId: number
    designerName: string
    meetingMode: MeetingModeType | 'BOTH'
    designerShop: string
    designerDistrict: string
    designerSpecialty: SpecialtyType
    designerContactCost: number
    designerUntactCost: number
    designerDescription: string
    imageUrl: string
}

export interface PaginationInfo {
    totalPages: number
    totalElements: number
    size: number
    number: number
    numberOfElements: number
    first: boolean
    last: boolean
    empty: boolean
}

export interface SortInfo {
    empty: boolean
    sorted: boolean
    unsorted: boolean
}

export interface Pageable {
    offset: number
    sort: SortInfo
    paged: boolean
    pageNumber: number
    pageSize: number
    unpaged: boolean
}

export interface DesignerListResponse {
    timestamp: string
    isSuccess: boolean
    code: string
    message: string
    data: {
        totalPages: number
        totalElements: number
        size: number
        content: Designer[] // ✅ 디자이너 리스트는 `content` 필드 안에 있음
        number: number
        sort: SortInfo
        numberOfElements: number
        pageable: Pageable
        first: boolean
        last: boolean
        empty: boolean
    }
}

export type MeetingMode = 'REMOTE' | 'FACE_TO_FACE' | 'BOTH'

export type District =
    | 'SEOUL_ALL'
    | 'GANGNAM_CHUNGDAM_APGUJUNG'
    | 'HONGDAE_YEONNAM_HAPJEONG'
    | 'SEONGSU_GUNDAE'
