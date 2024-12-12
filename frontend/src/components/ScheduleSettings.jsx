import React, { useState } from 'react'
import '../css/schedule-settings.css'
import Time from './Time'

const ScheduleSettings = () => {
  const [scheduleSettings, setScheduleSettings] = useState({
    dateRange: { start: '', end: '' },
    availableHours: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
  })

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

    // index is the interval of the day you want to update
    // field is start-time or end-time
  const updateInterval = (day, index, field, newValue) => {
    const updatedIntervals = scheduleSettings.availableHours[day].map(
      (interval, i) =>
        i === index ? { ...interval, [field]: newValue } : interval
    )
    handleAvailableHoursChange(day, updatedIntervals)
  }

  const generateTimeOptions = () => {
    const times = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${String(hour).padStart(2, '0')}:${String(
          minute
        ).padStart(2, '0')}`
        times.push(time)
      }
    }
    return times
  }

  const timeOptions = generateTimeOptions()

  return (
    <div className="toggle-section">
      {/* <h3>Schedule Settings</h3> */}
      <div className="schedule-settings">
        {/* Available Date Range*/}
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
                      e.target.checked ? [{}] : [],
                    )
                  }
                />
                {day}
              </label>

              {/* Intervals for the Day */}
              {scheduleSettings.availableHours[day].length > 0 && (
                <div>
                  {scheduleSettings.availableHours[day].map(
                    (interval, index) => ( // retrieves array of intervals for given day
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
                        <button onClick={() => removeInterval(day, index)}>
                          ✖
                        </button>
                      </div>
                    )
                  )}
                  <button onClick={() => addInterval(day)}>
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
