import ArrowIcon from '../../../public/img/arrow-down.svg'
import { districtDict } from '../../data/designers'
import { useHomeStore } from '../../store/useStore'

export default function RegionSectionButton() {
    const { toggleSheet, currentRegion } = useHomeStore()

    return (
        <button
            type='button'
            onClick={toggleSheet}
            className='flex items-center gap-4 bg-transparent py-6'>
            <span className='text-body2 text-black'>
                {districtDict[currentRegion]}
            </span>
            <img src={ArrowIcon} />
        </button>
    )
}
