import DesignerImg01 from '../../public/img/designer_image_1.jpg'
import DesignerImg02 from '../../public/img/designer_image_2.jpg'
import DesignerImg06 from '../../public/img/designer_image_6.jpg'
import DesignerImg11 from '../../public/img/designer_image_11.png'
import DesignerImg12 from '../../public/img/designer_image_12.png'
import DesignerImg13 from '../../public/img/designer_image_13.png'
import { TagType } from '../types/designerTypes'

export const designersData: {
    id: number

    designer: string
    tag: TagType[]
    reservationRate: number
    reviewCount: number
    profileImg: string
    shop: string
    rating: number
}[] = [
    {
        id: 1,
        designer: '이초 디자이너',
        tag: ['FACE_TO_FACE', 'REMOTE', 'PERM'],
        reservationRate: 98,
        reviewCount: 312,
        profileImg: DesignerImg01,
        shop: '블랑 에 누아르',
        rating: 4.9,
    },
    {
        id: 2,
        designer: '로로 원장',
        tag: ['FACE_TO_FACE', 'REMOTE', 'BLEACH'],
        reservationRate: 99,
        reviewCount: 58,
        profileImg: DesignerImg02,
        shop: '로로뷰티살롱',
        rating: 4.8,
    },
    {
        id: 3,
        designer: '슈 대표원장',
        tag: ['FACE_TO_FACE', 'BLEACH'],
        reservationRate: 98,
        reviewCount: 455,
        profileImg: DesignerImg06,
        shop: '슈헤어스튜디오',
        rating: 4.5,
    },
    {
        id: 4,
        designer: '히지 디자이너',
        tag: ['REMOTE', 'PERM'],
        reservationRate: 99,
        reviewCount: 117,
        profileImg: DesignerImg12,
        shop: '히지헤어 성수점',
        rating: 4.4,
    },
    {
        id: 5,
        designer: '랑 원장',
        tag: ['FACE_TO_FACE', 'REMOTE', 'BLEACH'],
        reservationRate: 95,
        reviewCount: 212,
        profileImg: DesignerImg11,
        shop: '랑크헤어',
        rating: 4.9,
    },
    {
        id: 6,
        designer: '현영 디자이너',
        tag: ['FACE_TO_FACE', 'REMOTE', 'BLEACH'],
        reservationRate: 96,
        reviewCount: 315,
        profileImg: DesignerImg13,
        shop: '현영헤어갤러리',
        rating: 4.7,
    },
]

export const designerDict: {
    [designer: string]: {
        shop: string
        rating: number
    }
} = {
    '이초 디자이너': { shop: '블랑 에 누아르', rating: 4.9 },
    '로로 원장': { shop: '로로뷰티살롱', rating: 4.8 },
    '슈 대표원장': { shop: '슈헤어스튜디오', rating: 4.5 },
    '랑 원장': { shop: '랑크헤어', rating: 4.9 },
    '히지 디자이너': { shop: '히지헤어 성수점', rating: 4.4 },
    '현영 디자이너': { shop: '현영헤어갤러리', rating: 4.7 },
    '나나 디자이너': { shop: '나나헤어살롱', rating: 4.5 },
    '이아 디자이너': { shop: '이아스타일', rating: 4.9 },
    '주 디자이너': { shop: '주헤어디자인', rating: 4.8 },
    '희 수석디자이너': { shop: '희헤어앤메이크업', rating: 4.9 },
    '시오 부원장': { shop: '시오헤어 강남점', rating: 4.7 },
    '휘리 원장': { shop: '휘리헤어스파', rating: 4.9 },
    '유하 디자이너': { shop: '유하헤어스튜디오', rating: 4.3 },
    '은이 수석디자이너': { shop: '은이헤어살롱', rating: 4.7 },
    '미미 컬러리스트': { shop: '미미컬러헤어', rating: 4.8 },
    '하루 컬러리스트': { shop: '하루헤어컬러스튜디오', rating: 4.9 },
}

export const districtDict = {
    SEOUL_ALL: '서울 전체',
    GANGNAM_CHUNGDAM_APGUJUNG: '강남/청담/압구정',
    HONGDAE_YEONNAM_HAPJEONG: '홍대/연남/합정',
    SEONGSU_GUNDAE: '성수/건대',
}

export const SpecialtyChipDict = {
    ALL: '전체',
    BLEACH: '탈염색',
    DYEING: '염색',
    PERM: '펌',
}
