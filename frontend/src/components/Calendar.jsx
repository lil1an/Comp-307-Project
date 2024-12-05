import React, { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from 'date-fns'
import '../css/calendar.css'

// Icons
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const renderHeader = () => {
    return (
      <div className="header">
        <MdOutlineArrowBackIosNew className="arrow" onClick={prevMonth} />
        <div id="month">
          <span>{format(currentMonth, 'MMMM yyyy')}</span>
        </div>
        <MdOutlineArrowForwardIos className="arrow" onClick={nextMonth} />
      </div>
    )
  }

  const renderWeekDays = () => {
    const days = []
    const date = new Date()
    const weekDays = Array.from({ length: 7 }).map((_, i) =>
      format(addDays(startOfWeek(date), i), 'E')
    )

    weekDays.forEach((day, index) => {
      days.push(<div key={index}>{day}</div>)
    })

    return <div className="weekday">{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth) // first day of currrent month
    const monthEnd = endOfMonth(monthStart) // last day of current month
    const startDate = startOfWeek(monthStart) // starting date of the week
    const endDate = endOfWeek(monthEnd) // ending date of the week

    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ''

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd')
        const cloneDay = day
        days.push(
          <div
            className={`cell ${
              !isSameMonth(day, monthStart) // not in curr month
                ? 'disabled'
                : isSameDay(day, selectedDate) // in curr month
                ? 'selected'
                : ''
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span
              className={`number ${
                isSameDay(day, selectedDate) ? 'selected' : ''
              }`}
            >
              {formattedDate}
            </span>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = []
    }
    return <div className="body">{rows}</div>
  }

  const onDateClick = (day) => {
    console.log(day)
    setSelectedDate(day)
  }

  return (
    <div className="calendar">
      <div className="calendar-wrapper">
        {renderHeader()}
        {renderWeekDays()}
      </div>
      {renderCells()}
    </div>
  )
}

export default Calendar
