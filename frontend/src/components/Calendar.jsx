import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md'

const Calendar = ({ dateRange, availableDays, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [cssLoaded, setCssLoaded] = useState(false) // Track if CSS is loaded

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const isWithinRange = (date) => {
    if (!dateRange.start || !dateRange.end) return false

    const startDate = new Date(dateRange.start)
    const endDate = new Date(dateRange.end)
    const dayName = format(date, 'EEEE')

    return (
      date >= startDate &&
      date <= addDays(endDate, 1) &&
      availableDays[dayName]?.length > 0
    )
  }

  const onDateClick = (day) => {
    setSelectedDate(day) // Update the selected date
    if (onDateSelect) {
      onDateSelect(day) // Notify the parent component
    }
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

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd')
        const cloneDay = day

        days.push(
          <div
            className={`number ${
              !isSameMonth(day, monthStart)
                ? 'disabled' // dates outside the current month
                : isSameDay(day, selectedDate)
                ? 'selected' // selected date
                : isWithinRange(day)
                ? 'in-range' // available dates
                : 'current-month' // days part of the current month
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
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
