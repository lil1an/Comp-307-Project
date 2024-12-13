import React, { useState } from 'react'
import '../css/schedule-settings.css'
import Time, { generateTimeOptions } from './Time'

const ScheduleSettings = ({scheduleSettings, setScheduleSettings}) => {
  const handleScheduleSettingsChange = (key, value) => {
    setScheduleSettings({ ...scheduleSettings, [key]: value })
  }

  const handleAvailableHoursChange = (day, hours) => {
    setScheduleSettings({
      ...scheduleSettings,
      availableHours: { ...scheduleSettings.availableHours, [day]: hours },
    })
  }

  const addInterval = (day) => {
    const updatedIntervals = [
      ...scheduleSettings.availableHours[day],
      { start: '', end: '' },
    ]
    handleAvailableHoursChange(day, updatedIntervals)
  }

  const removeInterval = (day, indexToRemove) => {
    const currentIntervals = scheduleSettings.availableHours[day]
    const updatedIntervals = currentIntervals.filter(
      (_, index) => index !== indexToRemove
    )
    handleAvailableHoursChange(day, updatedIntervals)
  }

  const updateInterval = (day, index, field, newValue) => {
    const updatedIntervals = scheduleSettings.availableHours[day].map(
      (interval, i) =>
        i === index ? { ...interval, [field]: newValue } : interval
    )
    handleAvailableHoursChange(day, updatedIntervals)
  }

  const timeOptions = generateTimeOptions()

  return (
    <div className="toggle-section">
      <div className="schedule-settings">
        {/* Available Date Range */}
        <div className="input-field">
          <label>Start Date:</label>
          <input
            type="date"
            value={scheduleSettings.dateRange.start}
            onChange={(e) =>
              handleScheduleSettingsChange('dateRange', {
                ...scheduleSettings.dateRange,
                start: e.target.value,
              })
            }
          />
        </div>
        <div className="input-field">
          <label>End Date:</label>
          <input
            type="date"
            value={scheduleSettings.dateRange.end}
            onChange={(e) =>
              handleScheduleSettingsChange('dateRange', {
                ...scheduleSettings.dateRange,
                end: e.target.value,
              })
            }
          />
        </div>

        {/* Available Hours */}
        <h5>Weekly Hours</h5>
        <div className="available-hours-wrapper">
          {Object.keys(scheduleSettings.availableHours).map((day) => (
            <div key={day} className="day-availability">
              <label>
                <input
                  type="checkbox"
                  checked={scheduleSettings.availableHours[day].length > 0}
                  onChange={(e) =>
                    handleAvailableHoursChange(
                      day,
                      e.target.checked ? [{}] : []
                    )
                  }
                />
                {day}
              </label>

              {/* Intervals for the Day */}
              {scheduleSettings.availableHours[day].length > 0 && (
                <div>
                  {scheduleSettings.availableHours[day].map(
                    (interval, index) => (
                      <div key={index} className="time-interval">
                        <Time
                          value={interval.start}
                          onChange={(value) =>
                            updateInterval(day, index, 'start', value)
                          }
                          options={timeOptions}
                        />
                        <span>-</span>
                        <Time
                          value={interval.end}
                          onChange={(value) =>
                            updateInterval(day, index, 'end', value)
                          }
                          options={timeOptions}
                        />
                        <button
                          className="remove-interval"
                          onClick={() => removeInterval(day, index)}
                        >
                          ✖
                        </button>
                      </div>
                    )
                  )}
                  <button
                    className="add-interval"
                    onClick={() => addInterval(day)}
                  >
                    ＋ Add Interval
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScheduleSettings
