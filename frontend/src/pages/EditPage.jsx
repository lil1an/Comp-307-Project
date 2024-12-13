import { useState } from 'react'
import Calendar from '../components/Calendar'
import NavBar from '../components/NavBar'
import EventDetails from '../components/EventDetails'
import ScheduleSettings from '../components/ScheduleSettings'
import Preview from '../components/Preview'
import { useLocation } from 'react-router-dom'
import TimeSlot from '../components/TimeSlot'
import '../css/edit-page.css'

const EditPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const apptId = queryParams.get('id')

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
          </div>
          <div className="tab-content">{renderTabs()}</div>
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
