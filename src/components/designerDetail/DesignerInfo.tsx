import React, { useEffect, useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { useGetDesignerInfo } from '../../apis/api/get/useGetDesignerInfo'
interface DesignerInfoProps {
    handleCopyLoc: (shop: string) => void
    designerId: string
}
import { chips } from '../../utils/chips'

const DesignerInfo: React.FC<DesignerInfoProps> = ({
    handleCopyLoc,
    designerId,
}) => {
    const [designerInfo, setDesignerInfo] = useState({
        name: '박수연 실장',
        location: '준오헤어 반포점',
        rate: '4.7',
        comment: '가치를 높여주는 이상적인 스타일을 찾아드려요',
        price: { offline: '30,000', online: '20,000' },
        meetingMode: 'BOTH',
        designerSpecialty: 'PERM',
    })

    // 디자이너 정보 받아오기
    const designerData = useGetDesignerInfo(designerId)
    useEffect(() => {
        if (designerData.isSuccess) {
            const data = designerData.data.data.data
            setDesignerInfo({
                name: data.designerName,
                location: data.designerShop,
                rate: '4.7',
                comment: data.designerDescription,
                price: {
                    offline: data.designerContactCost,
                    online: data.designerUntactCost,
                },
                meetingMode: data.meetingMode,
                designerSpecialty: data.designerSpecialty,
            })
            console.log(data)
        }
    }, [designerData.isSuccess])

    //칩 필터링
    const meetingModeChips = chips.filter((chip) => {
        if (
            designerInfo.meetingMode === 'BOTH' ||
            designerInfo.meetingMode === null
        ) {
            return chip.text === '직접' || chip.text === '온라인'
        }
        if (designerInfo.meetingMode === 'FACE_TO_FACE') {
            return chip.text === '직접'
        }
        if (designerInfo.meetingMode === 'REMOTE') {
            return chip.text === '온라인'
        }
        return false
    })

    // 특장점 칩 추가
    const specialtyMapping = {
        DYEING: '염색 전문',
        BLEACH: '탈색 전문',
        PERM: '펌 전문',
    }

    const specialtyChip = {
        text: specialtyMapping[
            designerInfo.designerSpecialty as keyof typeof specialtyMapping
        ],
        bg: '#F5F5F5',
        textColor: '#8C8C8C',
    }
    meetingModeChips.push(specialtyChip)

    return (
        <div className='flex flex-col gap-16 p-[1.25rem] pb-12'>
            {/* 디자이너 정보 */}
            <div className='flex flex-col gap-[0.3rem]'>
                <div className='flex gap-[0.3rem] space-x-2'>
                    {meetingModeChips.map((chip, index) => (
                        <span
                            key={index}
                            className='rounded-[0.25rem] p-[0.12rem] pl-[0.3rem] pr-[0.3rem] text-caption font-normal'
                            style={{
                                backgroundColor: chip.bg,
                                color: chip.textColor,
                            }}>
                            {chip.text}
                        </span>
                    ))}
                </div>
                <div className='font-bold text-h2 text-gray-1300'>
                    {designerInfo.name}
                </div>
                <div className='flex flex-row items-center gap-4 font-normal text-body1 text-gray-1300'>
                    {designerInfo.location}
                    <MdContentCopy
                        onClick={() => handleCopyLoc(designerInfo.location)}
                    />
                </div>
                <div className='flex flex-row'>
                    <img
                        src={`${import.meta.env.VITE_CLIENT_URL}/img/star-on.svg`}
                        alt='star'
                    />
                    <div className='flex items-end font-normal text-body2 text-gray-1300'>
                        {designerInfo.rate}
                    </div>
                </div>
            </div>

            {/* 코멘트 */}
            <div className='align-center flex w-full flex-row gap-[0.62rem] rounded-xl bg-neutral-100 pb-[0.875rem] pl-[0.75rem] pt-[0.875rem]'>
                <img
                    src={`${import.meta.env.VITE_CLIENT_URL}/img/logo-s-svg.svg`}
                    alt='logo'
                />
                <div className='flex items-end w-4/5 font-normal text-body2 text-gray-1300'>
                    {designerInfo.comment}
                </div>
            </div>
            {/* 가격 정보 */}
            <div className='flex flex-col gap-6 pr-2 mb-40'>
                {(designerInfo.meetingMode === null ||
                    designerInfo.meetingMode === 'FACE_TO_FACE') && (
                    <div className='flex flex-row justify-between'>
                        <span className='font-normal text-body1 text-gray-1300'>
                            직접
                        </span>
                        <span className='font-normal text-purple-500 text-body1'>
                            {`${designerInfo.price.offline.toLocaleString()}원 ~`}
                        </span>
                    </div>
                )}
                {(designerInfo.meetingMode === null ||
                    designerInfo.meetingMode === 'REMOTE') && (
                    <div className='flex flex-row justify-between'>
                        <span className='font-normal text-body1 text-gray-1300'>
                            온라인
                        </span>
                        <span className='font-normal text-purple-500 text-body1'>
                            {`${designerInfo.price.online.toLocaleString()}원 ~`}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DesignerInfo
