import React, { useState, useRef } from 'react'
import '../css/time.css'

// Dropdown menu for schedule settings (time)
const Time = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState(value || '') // stores curr value of input
  const [isValid, setIsValid] = useState(true)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsOpen((prev) => !prev)

  const handleOptionClick = (option) => {
    onChange(option)
    setSearchValue(option)
    setIsValid(true) // Reset validity when a valid option is selected
    setIsOpen(false)
  }

  const handleSearchChange = (e) => {
    const input = e.target.value
    setSearchValue(input)

    // Check input format (must be HH:mm)
    const isValidTime = /^\d{2}:\d{2}$/.test(input) && options.includes(input)
    setIsValid(isValidTime)

    // Only update the parent state if the input is valid
    if (isValidTime) {
      onChange(input)
      setIsOpen(false)
    }
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  return (
    <div className="dropdown" ref={dropdownRef} onMouseLeave={closeDropdown}>
      <input
        type="text"
        className={`dropdown-header ${isValid ? '' : 'invalid-input'}`} // Add a class for invalid state
        value={searchValue}
        onChange={handleSearchChange} // Allow user to type a time
        onClick={toggleDropdown} // Toggle dropdown on click
        placeholder="Select Time"
      />
      {!isValid && <div className="error-message">Invalid time format</div>}
      {/* Error message */}
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
