import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import MeetingTable from '../components/MeetingTable'
import Modal from '../components/Modal'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function MeetingsPage() {
  const [meetingsUpcoming, setMeetingsUpcoming] = useState([])
  const [meetingsHosting, setMeetingsHosting] = useState([])
  const [meetingsRequested, setMeetingsRequested] = useState([])
  const [meetingsDeclined, setMeetingsDeclined] = useState([])
  const [meetingsPast, setMeetingsPast] = useState([])
  const [loadingMeetings, setLoadingMeetings] = useState(false)

  const userId = localStorage.getItem('userId')

  const fetchMeetingsData = async (userId) => {
    setLoadingMeetings(true)

    try {
      const [
        meetingsUpcomingResponse,
        meetingsHostedResponse,
        unansweredRequestsResponse,
        declinedRequestsResponse,
        meetingsPastResponse,
      ] = await Promise.all([
        axios.get(`/meetings/upcoming/${userId}`),
        axios.get(`/meetings/hosted/${userId}`),
        axios.get(`/requests/unanswered/${userId}`),
        axios.get(`/requests/declined/${userId}`),
        axios.get(`/meetings/past/${userId}`),
      ])

      // console.log('frontend upcoming', meetingsUpcomingResponse?.data);
      // console.log('frontend hosting', meetingsHostedResponse?.data);
      // console.log('frontend unanswered', unansweredRequestsResponse?.data);
      // console.log('frontend declined', declinedRequestsResponse?.data);
      // console.log('frontend past', meetingsPastResponse?.data);

      setMeetingsUpcoming(meetingsUpcomingResponse?.data)
      setMeetingsHosting(meetingsHostedResponse?.data)
      setMeetingsRequested(unansweredRequestsResponse?.data)
      setMeetingsDeclined(declinedRequestsResponse?.data)
      setMeetingsPast(meetingsPastResponse?.data)
    } catch (err) {
      console.error(
        'Error fetching meetings data for user:',
        err.response?.data || err.message
      )
    }

    setLoadingMeetings(false)
  }

  useEffect(() => {
    if (userId) {
      fetchMeetingsData(userId)
    }
  }, [userId])

  const styles = {
    'meeting-table-container': {
      display: 'flex',
      justifyContent: 'center',
      height: 'calc(100vh - 145px)',
      backgroundColor: '#f4f4f4',
      paddingTop: '80px',
    },
  }

  return !userId ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
        fontSize: '20px',
        color: 'red',
      }}
    >
      User must be logged in to see this page.
    </div>
  ) : (
    <>
      <NavBar />
      <div style={styles['meeting-table-container']}>
        <div style={{ width: '80%' }}>
          <MeetingTable
            userId={userId}
            loading={loadingMeetings}
            upcomingMeetings={meetingsUpcoming}
            hostingMeetings={meetingsHosting}
            requestMeetings={meetingsRequested}
            declinedMeetings={meetingsDeclined}
            pastMeetings={meetingsPast}
            fetchMeetingsData={fetchMeetingsData}
          />
        </div>
      </div>
    </>
  )
}

export default MeetingsPage
