import { useState } from 'react'
import Calendar from '../components/Calendar'
import NavBar from '../components/NavBar'
import EventDetails from '../components/EventDetails'
import ScheduleSettings from '../components/ScheduleSettings'
import Preview from '../components/Preview'
import { useLocation } from 'react-router-dom'
import TimeSlot from '../components/TimeSlot'
import SaveCancelButtons from '../components/SaveCancelButtons'
import '../css/edit-page.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IoMdShare } from 'react-icons/io'

const EditPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const apptId = queryParams.get('id')
  const navigate = useNavigate()
  const { id: hostId } = location.state || {}

  // State for event details
  const [eventDetails, setEventDetails] = useState({
    name: '',
    duration: 30,
    location: '',
    description: '',
  })

  // State for schedule settings
  const [scheduleSettings, setScheduleSettings] = useState({
    dateRange: { start: '', end: '' },
    availableHours: {
      Monday: [{ start: '09:00', end: '12:00' }], // Default availability
      Tuesday: [{ start: '09:00', end: '12:00' }],
      Wednesday: [{ start: '09:00', end: '12:00' }],
      Thursday: [{ start: '09:00', end: '12:00' }],
      Friday: [{ start: '09:00', end: '12:00' }],
      Saturday: [{ start: '09:00', end: '12:00' }],
      Sunday: [{ start: '09:00', end: '12:00' }],
    },
  })

  // State for selected date
  const [selectedDate, setSelectedDate] = useState(null)

  // Tabs
  const [activeTab, setActiveTab] = useState('EventDetails')

  const renderTabs = () => {
    if (activeTab === 'EventDetails') {
      return (
        <EventDetails
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
        />
      )
    } else if (activeTab === 'ScheduleSettings') {
      return (
        <ScheduleSettings
          scheduleSettings={scheduleSettings}
          setScheduleSettings={setScheduleSettings}
        />
      )
    }
    return null
  }

  // Handle save and cancel buttons
  const handleCancel = () => {
    navigate('/home', { state: { id: hostId } })
    console.log('Event details have been saved:', eventDetails)
  }

  const handleSave = async () => {
    if (!hostId) {
      alert('Host ID not found. Please log in.')
      return
    }

    const meetingdata = {
      host: hostId,
      title: eventDetails.name,
      description: eventDetails.description,
      availabilities: scheduleSettings.availableHours,
      linkOrLocation: eventDetails.location,
      bookings: [],
      duration: eventDetails.duration,
    }

    console.log('Outgoing meeting data', meetingdata)

    try {
      if (apptId) {
        // Update existing meeting
        const response = await axios.put(
          `http://localhost:8080/meetings/${apptId}`,
          meetingdata
        )
        alert("Your meeting updates were saved.")
        console.log('Event has been updated!', response.data)
      } else {
        // Create new meeting
        const response = await axios.post(
          'http://localhost:8080/meetings/create',
          meetingdata
        )
        alert("Your meeting was created")
        console.log('Event has been saved!', response.data)
        // Redirect to edit page with the new meeting ID
        navigate(`/edit?id=${response.data._id}`, { state: { id: hostId } })
      }
    } catch (error) {
      console.error('Error! Event not saved/updated!', error)
      alert('Failed to save/update event. Enter all required fields!')
    }
  }



  return (
    <>
      <NavBar />
      <div className="create-page-wrapper">
        <div className="edit-wrapper">
          <h2>{apptId ? 'Edit Event' : 'Create New Event'}</h2>

          {/* Edit Side (Tabs) */}
          <div className="tab-navigation">
            <button
              className={activeTab === 'EventDetails' ? 'active-tab' : ''}
              onClick={() => setActiveTab('EventDetails')}
            >
              Event Details
            </button>
            <button
              className={activeTab === 'ScheduleSettings' ? 'active-tab' : ''}
              onClick={() => setActiveTab('ScheduleSettings')}
            >
              Schedule Settings
            </button>

            <button className="share">
              <IoMdShare />
            </button>
          </div>
          <div className="tab-content">{renderTabs()}</div>

          {/* Save and cancel buttons */}
          <SaveCancelButtons onSave={handleSave} onCancel={handleCancel} />
        </div>

        {/* Preview Calendar Side */}
        <div className="preview-wrapper">
          <Preview eventDetails={eventDetails} />
          <div className="calendar-preview">
            <Calendar
              dateRange={scheduleSettings.dateRange}
              availableDays={scheduleSettings.availableHours}
              onDateSelect={setSelectedDate}
            />
            <TimeSlot
              selectedDate={selectedDate}
              availableDays={scheduleSettings.availableHours}
              duration={eventDetails.duration}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPage
