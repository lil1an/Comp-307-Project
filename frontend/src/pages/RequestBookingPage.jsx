import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Calendar from '../components/Calendar'
import TimeSlot from '../components/TimeSlots'
import axios from 'axios'
import '../css/booking-page.css'
import { format, addMinutes, parse } from 'date-fns'

const RequestBookingPage = () => {
  const location = useLocation()

  // Retrieve userId from localStorage or state passed via location
  const userId = location.state?.userId || localStorage.getItem('userId')

  const { meetingId } = useParams()
  const [meetingData, setMeetingData] = useState(null)
  const [hostData, setHostData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null) 
  const [loading, setLoading] = useState(true) 
  const [error, setError] = useState(null)

  const fullTimeAvailabilites = {
    "Monday": [
      {
        "start": "09:00",
        "end": "17:00"
      }
    ],
    "Tuesday": [
      {
        "start": "09:00",
        "end": "17:00"
      }
    ],
    "Wednesday": [
      {
        "start": "09:00",
        "end": "17:00"
      }
    ],
    "Thursday": [
      {
        "start": "09:00",
        "end": "17:00"
      }
    ],
    "Friday": [
      {
        "start": "09:00",
        "end": "17:00"
      }
    ],
    "Saturday": [
      {
        "start": "09:00",
        "end": "17:00"
      }
    ],
    "Sunday": [
      {
        "start": "09:00",
        "end": "17:00"
      }
    ]
}

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

      setLoading(false)
    } catch (err) {
      console.error('Error fetching meeting data:', err)
      setError('Failed to load meeting details.')
      setLoading(false) 
    }
  }

  useEffect(() => {
    fetchMeetingData()
  }, [meetingId])


  const handleBooking = async() => {
    // create a request even if inside availabilities
    createRequest()
  }

  const createRequest = async () => {
    if (!selectedSlot || !selectedDate) {
      alert('Please select a date and time slot before booking.')
      return
    }

    try {
      const newRequest = {
        meeting: meetingId,
        userAskingAccount: userId || null,
        userAnswering: meetingData.host,
        userAnsweringResponse: null,
        date: format(new Date(selectedDate), 'yyyy-MM-dd'),
        starttime: format(parse(selectedSlot, 'HH:mm', new Date()), 'HH:mm'),
        endtime: format(
          addMinutes(
            parse(selectedSlot, 'HH:mm', new Date()), 
            meetingData.duration
          ), 
          'HH:mm'
        )
      };
      
      const response = await axios.post('http://localhost:8080/requests/create', newRequest);
      console.log('Response:', response.data);
      alert('Your request to meet was sent successfully!')
      return response.data;
    } catch (error) {
      console.error('Error creating request:', error);
      throw error;
    }
  }


  // Handle booking a slot
  const createBooking = async () => {
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
    <>
    <div style={{ }}><h2>Requesting Alternative Time For Meeting</h2></div>
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
              availableDays={fullTimeAvailabilites || {}}
              onDateSelect={setSelectedDate}
            />
          </div>

          <div className="time-slot">
            {selectedDate && (
              <TimeSlot
                selectedDate={selectedDate}
                availableDays={fullTimeAvailabilites || {}}
                bookings={meetingData.bookings} // Pass bookings to TimeSlots
                duration={meetingData.duration}
                clickable={true} // Enable interactivity
                onSlotSelect={setSelectedSlot} // Pass selected slot to state
              />
            )}
          </div>

          {/* Conditionally render the "Book Slot" button */}
          {meetingData.host !== userId ? (
            <button
              onClick={handleBooking}
              disabled={!selectedSlot}
              className="book-slot-button"
            >
              Request Slot
            </button>
          ) : (
            <p className="host-warning">
              You are the host for this meeting. You cannot book a slot. 
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default RequestBookingPage
