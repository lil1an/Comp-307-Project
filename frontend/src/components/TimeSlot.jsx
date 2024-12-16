import { format, addMinutes, parse } from 'date-fns'
import { useState } from 'react'
import '../css/time-slot.css'

const TimeSlots = ({
  selectedDate,
  availableDays,
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
