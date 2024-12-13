import React from 'react'
import { format, addMinutes, parse } from 'date-fns'
import '../css/time-slot.css'

const TimeSlots = ({ selectedDate, availableDays, duration }) => {
  if (!selectedDate) return null 

  const dayName = format(selectedDate, 'EEEE')
  const intervals = availableDays[dayName] || []

  const generateTimeSlots = (start, end) => {
    const slots = []
    let currentTime = parse(start, 'HH:mm', new Date())
    const endTime = parse(end, 'HH:mm', new Date())

    while (currentTime < endTime) {
      slots.push(format(currentTime, 'HH:mm'))
      currentTime = addMinutes(currentTime, duration)
    }

    return slots
  }

  // Generate time slots for all intervals of the selected day
  const timeSlots = intervals.flatMap(({ start, end }) =>
    generateTimeSlots(start, end)
  )

  return (
    <div className="time-slots-wrapper">
      {timeSlots.length > 0 ? (
        <div className="time-slots-container">
          {timeSlots.map((slot, index) => (
            <div className="time-slot-box" key={index}>
              {slot}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-time-slots">No available time slots for this day.</p>
      )}
    </div>
  )
}

export default TimeSlots
