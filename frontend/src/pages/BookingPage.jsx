import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Calendar from '../components/Calendar'
import TimeSlot from '../components/TimeSlot'
import axios from 'axios'
import '../css/booking-page.css'

const BookingPage = () => {
  const { meetingId } = useParams()
  const [meetingData, setMeetingData] = useState(null)
  const [hostData, setHostData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null) // Selected date for TimeSlot
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/meetings/${meetingId}`
        )
        const meeting = response.data
        setMeetingData(meeting)

        if (meeting.host) {
          const hostResponse = await axios.get(
            `http://localhost:8080/users/${meeting.host}`
          )
          setHostData(hostResponse.data)
        }

        setLoading(false)
      } catch (err) {
        console.error('Error fetching meeting data:', err)
        setError('Failed to load meeting details.')
        setLoading(false)
      }
    }

    fetchMeetingData()
  }, [meetingId])

  const handleBooking = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot before booking.')
      return
    }

    try {
      await axios.post(`http://localhost:8080/meetings/${meetingId}/book`, {
        slot: selectedSlot,
      })
      alert('Booking successful!')
    } catch (error) {
      console.error('Error booking meeting:', error)
      alert('Failed to book meeting. Please try again.')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="public-page-wrapper">
      <div className="display-wrapper">
        <div className="meeting-details">
          <h2>{meetingData.title}</h2>
          <p>
            <strong>Host:</strong>{' '}
            {hostData
              ? `${hostData.firstName} ${hostData.lastName}`
              : 'Loading...'}
          </p>
          <p>
            <strong>Location:</strong> {meetingData.linkOrLocation}
          </p>
          <p>
            <strong>Duration:</strong> {meetingData.duration} minutes
          </p>
          <p>{meetingData.description}</p>
        </div>

        <div className="preview-wrapper">
          <div className="calendar-preview">
            <Calendar
              dateRange={meetingData.dateRange || { start: '', end: '' }}
              availableDays={meetingData.availabilities || {}}
              onDateSelect={setSelectedDate} // Set the selected date
            />
          </div>

          {/* TimeSlot Component */}
          <div className="time-slot">
            {selectedDate && (
              <TimeSlot
                selectedDate={selectedDate} // Pass the selected date
                availableDays={meetingData.availabilities || {}}
                duration={meetingData.duration}
              />
            )}
          </div>
          <button onClick={handleBooking} disabled={!selectedSlot}>
            Book Slot
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
