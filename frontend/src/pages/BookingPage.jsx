import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Calendar from '../components/Calendar'
import TimeSlot from '../components/TimeSlot'
import axios from 'axios'
import '../css/booking-page.css'
import { format, addMinutes, parse } from 'date-fns'
import { useLocation } from 'react-router-dom'

const BookingPage = () => {
  const location = useLocation()

  // Retrieve userId from localStorage or state passed via location
  const userId = location.state?.userId || localStorage.getItem('userId')

  const { meetingId } = useParams()
  const [meetingData, setMeetingData] = useState(null)
  const [hostData, setHostData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null) // Store the selected time slot
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

  // Handle booking a slot
  const handleBooking = async () => {
    if (!selectedSlot || !selectedDate) {
      alert('Please select a date and time slot before booking.') // just in case
      return
    }

    try {
      // Fetch current meeting data
      const meetingResponse = await axios.get(
        `http://localhost:8080/meetings/${meetingId}`
      )
      const meetingData = meetingResponse.data

      if (!meetingData) {
        alert('Meeting not found.')
        return
      }

      // Create new booking Entry
      const newBooking = {
        attendee: userId,
        date: format(selectedDate, 'yyyy-MM-dd'), // Store date as 'YYYY-MM-DD'
        starttime: format(parse(selectedSlot, 'HH:mm', new Date()), 'HH:mm'), // Store time as 'HH:mm'
        endtime: format(
          // Store time as 'HH:mm'
          addMinutes(
            parse(selectedSlot, 'HH:mm', new Date()),
            meetingData.duration
          ),
          'HH:mm'
        ),
      }

      console.log('This is the new booking array: ', newBooking)

      // Update booking array
      const updatedBookings = [...meetingData.bookings, newBooking]

      // Send updated bookings array back to the backend
      await axios.put(`http://localhost:8080/meetings/${meetingId}`, {
        bookings: updatedBookings,
      })

      alert('Meeting Booked!')
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
              onDateSelect={setSelectedDate}
            />
          </div>

          <div className="time-slot">
            {selectedDate && (
              <TimeSlot
                selectedDate={selectedDate}
                availableDays={meetingData.availabilities || {}}
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
