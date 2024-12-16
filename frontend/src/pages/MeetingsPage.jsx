import React, { useState, useEffect } from 'react'
import NavBar from "../components/NavBar"
import MeetingTable from '../components/MeetingTable'
import Modal from '../components/Modal'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function MeetingsPage() {
  const [meetingsUpcoming, setMeetingsUpcoming] = useState([]);
  const [meetingsHosting, setMeetingsHosting] = useState([]);
  const [meetingsRequested, setMeetingsRequested] = useState([]);
  const [meetingsDeclined, setMeetingsDeclined] = useState([]);
  const [meetingsPast, setMeetingsPast] = useState([]);

  const id = localStorage.getItem('userId');

  useEffect(() => {
    if (id) {
      const fetchMeetingsData = async (id) => {
        try {
          const [
            meetingsUpcomingResponse,
            meetingsHostedResponse,
            unansweredRequestsResponse,
            declinedRequestsResponse,
            meetingsPastResponse
          ] = await Promise.all([
            axios.get(`http://localhost:8080/meetings/upcoming/${id}`),
            axios.get(`http://localhost:8080/meetings/hosted/${id}`),
            axios.get(`http://localhost:8080/requests/unanswered/${id}`),
            axios.get(`http://localhost:8080/requests/declined/${id}`),
            axios.get(`http://localhost:8080/meetings/past/${id}`)
          ]);

          console.log('frontend upcoming', meetingsUpcomingResponse?.data);
          console.log('frontend hosting', meetingsHostedResponse?.data);
          console.log('frontend unanswered', unansweredRequestsResponse?.data);
          console.log('frontend declined', declinedRequestsResponse?.data);
          console.log('frontend past', meetingsPastResponse?.data);

          setMeetingsUpcoming(meetingsUpcomingResponse?.data);
          setMeetingsHosting(meetingsHostedResponse?.data);
          setMeetingsRequested(unansweredRequestsResponse?.data);
          setMeetingsDeclined(declinedRequestsResponse?.data);
          setMeetingsPast(meetingsPastResponse?.data);
        } catch (err) {
          console.error('Error fetching meetings data for user:', err.response?.data || err.message);
        }
      };
      fetchMeetingsData(id);
    }
  }, [id]);

  const styles = {
    'meeting-table-container': {
      display: 'flex',
      justifyContent: 'center',
      height: 'calc(100vh - 145px)',
      backgroundColor: '#f4f4f4',
      paddingTop: '80px'
    },
  };

  return (
    <>
      <NavBar />
      <div style={styles["meeting-table-container"]}>
        <div style={{width: '80%'}}>
          <MeetingTable 
            userId={id}
            upcomingMeetings={meetingsUpcoming} 
            hostingMeetings={meetingsHosting} 
            requestMeetings={meetingsRequested} 
            declinedMeetings={meetingsDeclined} 
            pastMeetings={meetingsPast} />
        </div>
      </div>
    </>
  )
}

export default MeetingsPage
