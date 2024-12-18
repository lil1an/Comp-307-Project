// Lilan Forsyth
import React from 'react'
import TimeDropdown from './DropDown'
import '../css/time-dropdown.css'

// Generate time options (e.g., "09:00", "09:15")
export const generateTimeOptions = () => {
  const times = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(
        2,
        '0'
      )}`
      times.push(time)
    }
  }
  return times
}

const Time = ({ value, onChange, options }) => {
  return (
    <TimeDropdown
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Select Time"
    />
  )
}

export default Time
