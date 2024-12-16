import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Calendar from '../components/Calendar'
import TimeSlot from '../components/TimeSlots'
import axios from 'axios'
import '../css/booking-page.css'
import { format, addMinutes, parse } from 'date-fns'

const BookingPage = () => {
  const location = useLocation()

  // Retrieve userId from localStorage or state passed via location
  const userId = location.state?.userId || localStorage.getItem('userId')

  const { meetingId } = useParams()
  const [meetingData, setMeetingData] = useState(null)
  const [hostData, setHostData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null) // Store the selected time slot
  const [loading, setLoading] = useState(true) // Add loading state for meeting data
  const [error, setError] = useState(null)

  // Function to fetch meeting data
  const fetchMeetingData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/meetings/${meetingId}`
      )
      const meeting = response.data
      setMeetingData(meeting)

      console.log('Fetching meeting: ', meeting)

      if (meeting.host) {
        const hostResponse = await axios.get(
          `http://localhost:8080/users/${meeting.host}`
        )
        setHostData(hostResponse.data)
      }

      setLoading(false) // Set loading to false when data is fetched
    } catch (err) {
      console.error('Error fetching meeting data:', err)
      setError('Failed to load meeting details.')
      setLoading(false) // Ensure loading is false even if there's an error
    }
  }

  useEffect(() => {
    fetchMeetingData()
  }, [meetingId])

  // Handle booking a slot
  const handleBooking = async () => {
    if (!selectedSlot || !selectedDate) {
      alert('Please select a date and time slot before booking.')
      return
    }

    try {
      const newBooking = {
        attendee: userId,
        date: format(selectedDate, 'yyyy-MM-dd'), // Store date as 'YYYY-MM-DD'
        starttime: format(parse(selectedSlot, 'HH:mm', new Date()), 'HH:mm'), // Store time as 'HH:mm'
        endtime: format(
          addMinutes(
            parse(selectedSlot, 'HH:mm', new Date()),
            meetingData.duration
          ),
          'HH:mm'
        ),
      }

      const updatedBookings = [...meetingData.bookings, newBooking]

      await axios.put(`http://localhost:8080/meetings/${meetingId}`, {
        bookings: updatedBookings,
      })

      alert('Meeting Booked!')
      fetchMeetingData() // Re-fetch meeting data after booking
    } catch (error) {
      console.error('Error booking meeting:', error)
      alert('Failed to book meeting. Please try again.')
    }
  }

  if (loading) return <p>Loading...</p> // Render a loading message until data is fetched
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
              onDateSelect={setSelectedDate}
            />
          </div>

          <div className="time-slot">
            {selectedDate && (
              <TimeSlot
                selectedDate={selectedDate}
                availableDays={meetingData.availabilities || {}}
                bookings={meetingData.bookings} // Pass bookings to TimeSlots
                duration={meetingData.duration}
                clickable={true} // Enable interactivity
                onSlotSelect={setSelectedSlot} // Pass selected slot to state
              />
            )}
          </div>
          <button
            onClick={handleBooking}
            disabled={!selectedSlot}
            className="book-slot-button"
          >
            Book Slot
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
