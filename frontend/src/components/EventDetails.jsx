import { useState } from 'react'
import '../css/event-details.css'

const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    duration: 30,
    location: '',
    description: '',
  })

  const handleEventDetailChange = (key, value) => {
    setEventDetails({ ...eventDetails, [key]: value })
  }

  return (
    <div className="toggle-section">
      <h3>Event Details</h3>
      <div className="event-details">
        <h5 className="event-input">
          Event Name:
          <input
            type="text"
            placeholder="Event Name"
            value={eventDetails.name}
            onChange={(e) => handleEventDetailChange('name', e.target.value)}
          />
        </h5>
        <h5 className="event-input">
          Duration
          <input
            type="number"
            placeholder="Duration:"
            value={eventDetails.duration}
            onChange={(e) =>
              handleEventDetailChange('duration', e.target.value)
            }
          />
        </h5>
        <h5 className="event-input">
          Location:
          <select
            value={eventDetails.location}
            onChange={(e) =>
              handleEventDetailChange('location', e.target.value)
            }
          >
            <option value="">Select Location</option>
            <option value="zoom">Zoom</option>
            <option value="phone-call">Phone Call</option>
            <option value="in-person">In-Person</option>
          </select>
        </h5>
        <h5 className="event-input">
          Description:
          <textarea
            placeholder="Description"
            value={eventDetails.description}
            onChange={(e) =>
              handleEventDetailChange('description', e.target.value)
            }
          />
        </h5>
      </div>
    </div>
  )
}

export default EventDetails
