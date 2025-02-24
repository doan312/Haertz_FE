import { SpecialtyType } from './../types/designerTypes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
    District,
    MeetingMode,
    SpecialtyChipType,
} from '../types/designerTypes'

interface accessTokenStore {
    accessToken: string | null
    setAccessToken: (token: string) => void
}

export const useAccessTokenStore = create<accessTokenStore>()(
    persist(
        (set) => ({
            accessToken: null,
            setAccessToken: (token) => set({ accessToken: token }),
        }),
        {
            name: 'access-token-storage',
        }
    )
)

export interface Filter {
    meetingMode?: MeetingMode | null
    district?: District | null
    categories: SpecialtyChipType[]
    size: number
    page: number
    sortBy: string
    direction: string
}

interface HomeStore {
    meetingMode: MeetingMode
    isSheetOpen: boolean
    currentRegion: District
    selectedChips: SpecialtyChipType[]
    displayCount: number
    filter: Filter // 추가됨
    setMeetingMode: (to: MeetingMode) => void
    toggleSheet: () => void
    setCurrentRegion: (to: District) => void
    toggleChip: (chip: SpecialtyChipType) => void
    addDisplayCount: () => void
    updateFilter: () => void // 필터 업데이트 함수 추가
}

export const useHomeStore = create<HomeStore>((set, get) => ({
    meetingMode: 'BOTH',
    isSheetOpen: false,
    currentRegion: 'SEOUL_ALL',
    selectedChips: ['ALL'],
    displayCount: 5,
    filter: {
        meetingMode: null,
        district: null,
        categories: ['BLEACH', 'DYEING', 'PERM'],
        size: 5,
        page: 0,
        sortBy: 'designerName',
        direction: 'ASC',
    },

    setMeetingMode: (to: MeetingMode) => {
        const currentType = get().meetingMode
        const newMode = currentType === to ? 'BOTH' : to
        set({ meetingMode: newMode })
        get().updateFilter() // 필터 업데이트
    },

    toggleSheet: () => {
        set({ isSheetOpen: !get().isSheetOpen })
    },

    setCurrentRegion: (to: District) => {
        set({ currentRegion: to })
        get().updateFilter() // 필터 업데이트
    },

    toggleChip: (chip: SpecialtyChipType) => {
        const { selectedChips } = get()
        const allOptions: SpecialtyType[] = ['BLEACH', 'DYEING', 'PERM']

        let newSelectedChips: SpecialtyChipType[]

        if (chip === 'ALL') {
            // 'ALL'을 선택하면 기존 선택된 모든 개별 옵션 해제하고 'ALL'만 선택
            newSelectedChips = ['ALL']
        } else {
            newSelectedChips = selectedChips.includes(chip)
                ? selectedChips.filter((c) => c !== chip)
                : [...selectedChips.filter((c) => c !== 'ALL'), chip]

            // 모든 개별 옵션이 선택되었을 경우 'ALL'로 대체
            if (allOptions.every((c) => newSelectedChips.includes(c))) {
                newSelectedChips = ['ALL']
            }

            // 아무것도 선택되지 않으면 'ALL'을 기본값으로 설정
            if (newSelectedChips.length === 0) {
                newSelectedChips = ['ALL']
            }
        }

        set({ selectedChips: newSelectedChips })
        get().updateFilter() // 필터 업데이트
    },

    addDisplayCount: () => {
        set({ displayCount: get().displayCount + 5 })
        get().updateFilter() // 필터 업데이트
    },

    updateFilter: () => {
        const { meetingMode, currentRegion, selectedChips, displayCount } =
            get()

        // 'ALL'이 선택되면 모든 카테고리 포함
        const validCategories: SpecialtyType[] = ['BLEACH', 'PERM', 'DYEING']
        const categories = selectedChips.includes('ALL')
            ? validCategories
            : selectedChips

        set({
            filter: {
                meetingMode: meetingMode === 'BOTH' ? null : meetingMode,
                district: currentRegion === 'SEOUL_ALL' ? null : currentRegion,
                categories,
                page: 0,
                size: displayCount,
                sortBy: 'designerName',
                direction: 'ASC',
            },
        })
    },
}))
