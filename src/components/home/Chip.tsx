import { SpecialtyChipDict } from '../../data/designers'
import { useHomeStore } from '../../store/useStore'
import { SpecialtyChipType } from '../../types/designerTypes'

interface Props {
    active?: boolean
    value: SpecialtyChipType
}

export default function Chip({ value }: Props) {
    const { selectedChips, toggleChip } = useHomeStore()

    const selected = selectedChips.includes(value)

    const style = selected
        ? 'text-gray-100 bg-purple-500'
        : 'text-gray-700 bg-gray-100'

    return (
        <button
            type='button'
            onClick={() => toggleChip(value)}
            className={`rounded-30 px-10 py-6 text-body2 font-medium shadow-[0_0_4px_0_rgba(0,0,0,0.03)] transition duration-200 ease-in-out hover:outline-none ${style}`}>
            {SpecialtyChipDict[value]}
        </button>
    )
}
