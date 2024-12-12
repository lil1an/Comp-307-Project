import React, { useState, useRef } from 'react'
import '../css/time.css'

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

// Dropdown menu for selecting and validating time
const Time = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(value || '') // Current input value
  const [isValid, setIsValid] = useState(true) // Validity of input
  const dropdownRef = useRef(null)

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev)

  // Handle option selection
  const handleOptionClick = (option) => {
    onChange(option)
    setSearchValue(option)
    setIsValid(true)
    setIsOpen(false)
  }

  // Handle text input and validation
  const handleSearchChange = (e) => {
    const input = e.target.value
    setSearchValue(input)

    const isValidTime = /^\d{2}:\d{2}$/.test(input) && options.includes(input)
    setIsValid(isValidTime)

    if (isValidTime) {
      onChange(input)
      setIsOpen(false)
    }
  }

  // Close dropdown when mouse leaves
  const closeDropdown = () => {
    setIsOpen(false)
  }

  return (
    <div className="dropdown" ref={dropdownRef} onMouseLeave={closeDropdown}>
      <input
        type="text"
        className={`dropdown-header ${isValid ? '' : 'invalid-input'}`}
        value={searchValue}
        onChange={handleSearchChange}
        onClick={toggleDropdown}
        placeholder="Select Time"
      />
      {!isValid && <div className="error-message">Invalid time format</div>}
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Time
