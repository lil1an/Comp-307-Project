import React, { useState } from 'react'
import '../css/time-dropdown.css'

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen((prev) => !prev)

  const handleOptionClick = (option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="dropdown" onMouseLeave={() => setIsOpen(false)}>
      <div className="dropdown-header1" onClick={toggleDropdown}>
        {value || placeholder}
      </div>
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

export default Dropdown
