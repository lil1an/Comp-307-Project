import {
  format,
  addMinutes,
  parse,
  isEqual,
  isAfter,
  isBefore,
  startOfDay,
} from 'date-fns'
import { useState } from 'react'
import '../css/time-slot.css'

const TimeSlots = ({
  selectedDate,
  availableDays,
  bookings,
  duration,
  onSlotSelect,
  clickable = false,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null)

  // Return null if no date selected
  if (!selectedDate) return null

  const dayName = format(selectedDate, 'EEEE')
  const intervals = availableDays[dayName] || []

  const generateTimeSlots = (start, end) => {
    if (!start || !end) {
      return [] // Skip this interval if start or end is missing
    }

    try {
      const slots = []
      let currentTime = parse(start, 'HH:mm', new Date())
      const endTime = parse(end, 'HH:mm', new Date())

      while (currentTime < endTime) {
        slots.push(format(currentTime, 'HH:mm'))
        currentTime = addMinutes(currentTime, duration)
      }

      return slots
    } catch (error) {
      console.error('Error generating time slots:', { start, end }, error)
      return [] // Skip this interval if parsing fails
    }
  }

  // Check if a time slot is booked
  const isSlotBooked = (slot) => {
    return bookings.some((booking) => {
      const bookingDate = booking.date // ISO date string: '2024-12-15'
      const bookingStartTime = booking.starttime // ISO time string: '14:00'
      const bookingEndTime = booking.endtime // ISO time string: '14:30'

      // Check if the booking matches the selected date
      const isSameDate = format(selectedDate, 'yyyy-MM-dd') === bookingDate

      // Check if the slot falls within the booked time range
      const isSameSlot = slot >= bookingStartTime && slot < bookingEndTime

      return isSameDate && isSameSlot
    })
  }

  // Generate time slots for all intervals of the selected day
  const timeSlots = intervals
    .flatMap(({ start, end }) => generateTimeSlots(start, end))
    .filter((slot) => !isSlotBooked(slot)) // Exclude booked slots

  const handleSlotClick = (slot) => {
    if (clickable) {
      setSelectedSlot(slot)
      if (onSlotSelect) {
        onSlotSelect(slot) // Notify parent about selected slot
      }
    }
  }

  return (
    <div className="time-slots-wrapper">
      {timeSlots.length > 0 ? (
        <div className="time-slots-container">
          {timeSlots.map((slot, index) => (
            <div
              className={`time-slot-box ${
                selectedSlot === slot ? 'selected' : ''
              } ${clickable ? 'clickable' : ''}`}
              key={index}
              onClick={() => handleSlotClick(slot)} // Handle click only if clickable
            >
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
