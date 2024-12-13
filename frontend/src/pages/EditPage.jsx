import { useState } from 'react'
import Calendar from '../components/Calendar'
import NavBar from '../components/NavBar'
import EventDetails from '../components/EventDetails'
import ScheduleSettings from '../components/ScheduleSettings'
import Preview from '../components/Preview'
import { useLocation } from 'react-router-dom'
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
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
  })

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
            <Calendar dateRange={scheduleSettings.dateRange} />
          </div>
        </div>
      </div>
    </>
  )
}

export default EditPage
