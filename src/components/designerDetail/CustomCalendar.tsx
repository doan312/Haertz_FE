import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import '../../styles/calendar.css'
import dayjs from 'dayjs'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { useGetAvailableDates } from '../../apis/api/get/useGetAvailableDates'
import { useLocation } from 'react-router-dom'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface DateSelectProps {
    selectedDate: Value | null
    handleDateClick: (value: Value) => void
}

const CustomCalendar: React.FC<DateSelectProps> = ({
    selectedDate,
    handleDateClick,
}) => {
    //선택 가능한 maxDate 설정
    const threeMonthLater = dayjs().add(3, 'month').endOf('month').toDate()

    //디자이너 아이디 받기
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const designerId = queryParams.get('id') || ''
    /**
     * 예약 가능 기간 조회
     */
    const availableDates = useGetAvailableDates(designerId)
    const [availableDateList, setAvailableDateList] = useState<string[]>([])

    useEffect(() => {
        if (availableDates.isSuccess && availableDates.data !== null) {
            setAvailableDateList(
                availableDates.data.data.data['예약 가능 날짜 리스트: ']
            )
        }
    }, [availableDates.isSuccess])

    useEffect(() => {
        if (availableDateList.length > 0) {
            const firstAvailableDate = availableDateList[0]
            handleDateClick(new Date(firstAvailableDate))
        }
    }, [availableDateList])

    return (
        <div className='align-items-center flex justify-center'>
            <Calendar
                calendarType='gregory'
                view='month'
                locale='ko'
                formatMonthYear={(_, date) => dayjs(date).format('YYYY.MM')}
                formatDay={(_, date) => dayjs(date).format('D')}
                onChange={handleDateClick}
                value={selectedDate}
                minDate={new Date()} // 오늘 이전 날짜 선택 불가
                maxDate={threeMonthLater} // 3개월 이후 날짜 선택 불가
                prevLabel={<SlArrowLeft />}
                nextLabel={<SlArrowRight />}
                prev2Label={null}
                next2Label={null}
                showNeighboringMonth={false}
                tileDisabled={({ date }) =>
                    !availableDateList.includes(
                        dayjs(date).format('YYYY-MM-DD')
                    )
                }
            />
        </div>
    )
}

export default CustomCalendar
