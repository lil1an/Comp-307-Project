import Calendar from '../components/Calendar'
import NavBar from '../components/NavBar'
import EventDetails from '../components/EventDetails'
import ScheduleSettings from '../components/ScheduleSettings'
import { useLocation } from 'react-router-dom'
import { act, useState } from 'react'
import '../css/edit-page.css'

const EditPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const apptId = queryParams.get('id')

  // Tabs
  const [activeTab, setActiveTab] = useState('EventDetails')

  const renderTabs = () => {
    if (activeTab === 'EventDetails') {
      return <EventDetails />
    } else if (activeTab === 'ScheduleSettings') {
      return <ScheduleSettings />
    }
    return null
  }

  return (
    <>
      <NavBar />
      {/* Edit Calendar Side */}
      <div className="create-page-wrapper">
        <div className="edit-wrapper">
          <h2>{apptId ? 'Edit Event' : 'Create New Event'}</h2>

          {/* Navigation Tabs */}
          <div className="tab-navigation"></div>
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

          {/* Tab Content */}
          <div className="tab-content">{renderTabs()}</div>
        </div>

        {/* Preview Calendar Side */}
        <div className="preview-wrapper">
          <Calendar />
        </div>
      </div>
    </>
  )
}

export default EditPage
