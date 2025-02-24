import { useGetDesignerList } from '../../apis/api/get/useGetDesignerList'
import { useHomeStore } from '../../store/useStore'
import BottomSheet from './BottomSheet'
import Button from './Button'
import Chip from './Chip'
import DesignerCard from './DesignerCard'
import MethodSelectionCard from './MethodSelectionCard'
import ErrorCover from './NoResultCover'
import RegionSectionButton from './RegionSectionButton'

export default function MainSection() {
    const { filter, displayCount } = useHomeStore()
    const { data: responseData, error } = useGetDesignerList(filter)
    const designerList = responseData?.data.content

    return (
        <div className='flex flex-col mb-44 mt-69'>
            <h2 className='mb-16 -mx-4 font-bold text-h2 text-gray-1300'>
                어떤 방식으로 상담 받을까요?
            </h2>
            <div className='flex -mx-4 mb-21 gap-11'>
                <MethodSelectionCard mode='FACE_TO_FACE' />
                <MethodSelectionCard mode='REMOTE' />
            </div>
            <div className='flex items-center justify-between w-full mb-22'>
                <div className='flex gap-6'>
                    <Chip active value='ALL' />
                    <Chip value='BLEACH' />
                    <Chip value='DYEING' />
                    <Chip value='PERM' />
                </div>
                <RegionSectionButton />
            </div>
            <div className='flex flex-col gap-16 mb-16'>
                {error ? (
                    <ErrorCover type='network' />
                ) : designerList && designerList.length > 0 ? (
                    designerList.map((designer) => {
                        return <DesignerCard {...designer} />
                    })
                ) : (
                    <ErrorCover type='notfound' />
                )}
            </div>
            <Button
                disabled={!designerList || designerList?.length < displayCount}
            />
            <BottomSheet />
        </div>
    )
}
