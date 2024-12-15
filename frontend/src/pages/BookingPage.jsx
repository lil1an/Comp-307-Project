import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Calendar from '../components/Calendar'
import Preview from '../components/Preview'
import axios from 'axios'
import '../css/booking-page.css'

const BookingPage = () => {
  const { meetingId } = useParams() // Get meeting ID from URL
  const [meetingData, setMeetingData] = useState(null)
  const [hostData, setHostData] = useState(null) // Store host details
  const [selectedSlot, setSelectedSlot] = useState(null) // Store selected slot
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch meeting data on mount
  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/meetings/${meetingId}`
        )
        const meeting = response.data
        console.log('Fetched Meeting Data:', meeting)
        setMeetingData(meeting)

        // Fetch host details using the host ID
        if (meeting.host) {
          const hostResponse = await axios.get(
            `http://localhost:8080/users/${meeting.host}`
          )
          // console.log('Fetched Host Data:', hostResponse.data)
          setHostData(hostResponse.data)
        }

        setLoading(false)
      } catch (err) {
        console.error('Error fetching meeting or host data:', err)
        setError('Failed to load meeting details. Please try again later.')
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
      const response = await axios.post(
        `http://localhost:8080/meetings/${meetingId}/book`,
        {
          slot: selectedSlot,
        }
      )
      alert('Booking successful!')
    } catch (error) {
      console.error('Error booking meeting:', error)
      alert('Failed to book meeting. Please try again.')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      {/* <NavBar /> */}
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
                availableDays={Object.entries(
                  meetingData.availabilities || {}
                ).reduce((acc, [day, slots]) => {
                  acc[day] = (slots || []).filter(
                    (slot) => slot?.start && slot?.end
                  )
                  return acc
                }, {})}
                onDateSelect={setSelectedSlot}
              />

              <button onClick={handleBooking} disabled={!selectedSlot}>
                Book Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingPage
