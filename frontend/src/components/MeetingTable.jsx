import React, { useState, useEffect} from 'react';
import MeetingRowComponent from './MeetingRowComponent';
import '../css/meeting-table.css'
import '../index.css'
import { GoDotFill } from "react-icons/go";
import axios from 'axios';
import Modal from './Modal.jsx'

const MeetingTable = ({ userId, upcomingMeetings, hostingMeetings, requestMeetings, declinedMeetings, pastMeetings, loading }) => {
  const tabs = ['Upcoming', 'Hosting', 'Requests', 'Declined', 'Past'];

  const tabsToMeetings = {
    'Upcoming': upcomingMeetings, 
    'Hosting': hostingMeetings,
    'Requests': requestMeetings, 
    'Declined': declinedMeetings, 
    'Past': pastMeetings
  }

  const noMeetingsMessages = {
    'Upcoming': 'No upcoming meetings to display', 
    'Hosting': 'You are not hosting any meetings',
    'Requests': 'No pending meeting requests', 
    'Declined': 'No declined meetings', 
    'Past': 'No past meetings to display',
  }

  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [selectedMeetings, setSelectedMeetings] = useState(upcomingMeetings);
  const [cancelMeetingModalVisible, setCancelMeetingModalVisible] = useState(false);
  const [declineMeetingModalVisible, setDeclineMeetingModalVisible] = useState(false);
  const [declineRequestModalVisible, setDeclineRequestModalVisible] = useState(false);
  const [acceptRequestModalVisible, setAcceptRequestModalVisible] = useState(false);
  const [responseSavedSuccessfullyModalVisible, setResponseSavedSuccessfullyModalVisible] = useState(false);
  const [selectedMeetingOrRequest, setSelectedMeetingOrRequest] = useState(null);
  const [selectedMeetingOrRequestTime, setSelectedMeetingOrRequestTime] = useState(null);


  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setSelectedMeetings(tabsToMeetings[tab]);
  };

  const handleMeetingDecline = (meetingId, date, starttime, endtime) => {
    setDeclineMeetingModalVisible(true);
    setSelectedMeetingOrRequest(meetingId);
    setSelectedMeetingOrRequestTime({date, starttime, endtime});
  }

  useEffect(() => {
    setSelectedMeetings(tabsToMeetings[selectedTab]);
  }, [selectedTab, upcomingMeetings, hostingMeetings, requestMeetings, declinedMeetings, pastMeetings]);

  const handleMeetingDeclineConfirm = async () => {
    try {
      // get the meeting
      const meeting = await axios.get(`http://localhost:8080/meetings/${selectedMeetingOrRequest}`);

      // find the booking to remove
      const bookingIndex = meeting.data.bookings.findIndex(
        (booking) =>
          booking.attendee === userId &&
          booking.date === selectedMeetingOrRequestTime.date &&
          booking.starttime === selectedMeetingOrRequestTime.starttime &&
          booking.endtime === selectedMeetingOrRequestTime.endtime
      );
  
      // if a matching booking is found, remove it
      if (bookingIndex !== -1) {
        meeting.data.bookings.splice(bookingIndex, 1);
        console.log('Booking removed:', meeting.data.bookings);
        
        // send the updated meeting data back to backend
        await axios.put(
          `http://localhost:8080/meetings/${selectedMeetingOrRequest}`,
          { bookings: meeting.data.bookings }
        );
  
        console.log('Meeting updated');
      } else {
        console.log('Booking not found.');
      }
      
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  
    // close the decline modal and show the success modal
    setDeclineMeetingModalVisible(false);
    setResponseSavedSuccessfullyModalVisible(true);
  };

  const handleMeetingCancel= (meetingId, date, starttime, endtime) => {
    setCancelMeetingModalVisible(true);
    setSelectedMeetingOrRequest(meetingId);
    setSelectedMeetingOrRequestTime({date, starttime, endtime});
  }

  const handleMeetingCancelConfirm = async () => {
    try {
      // get the meeting/attendee
      const meeting = await axios.get(`http://localhost:8080/meetings/${selectedMeetingOrRequest}`);

      // find the booking to remove
      const bookingIndex = meeting.data.bookings.findIndex(
        (booking) =>
          booking.date === selectedMeetingOrRequestTime.date &&
          booking.starttime === selectedMeetingOrRequestTime.starttime &&
          booking.endtime === selectedMeetingOrRequestTime.endtime
      );
  
      // if a matching booking is found, remove it
      if (bookingIndex !== -1) {
        meeting.data.bookings.splice(bookingIndex, 1);
        console.log('Booking removed:', meeting.data.bookings);
        
        // send the updated meeting data back to backend
        await axios.put(
          `http://localhost:8080/meetings/${selectedMeetingOrRequest}`,
          { bookings: meeting.data.bookings }
        );
  
        console.log('Meeting updated');
      } else {
        console.log('Booking not found.');
      }
      
    } catch (error) {
      console.error('Error updating meeting:', error);
    }
  
    // close the cancel meeting modal and show the success modal
    setCancelMeetingModalVisible(false);
    setResponseSavedSuccessfullyModalVisible(true);
  };

  const handleRequestDecline = (requestId, meetingId, date, starttime, endtime) => {
    setDeclineRequestModalVisible(true);
    setSelectedMeetingOrRequest(requestId);
    setSelectedMeetingOrRequestTime({date, starttime, endtime});
  }

  const handleRequestDeclineConfirm = async () => {
    try {
      await axios.put(
        `http://localhost:8080/requests/${selectedMeetingOrRequest}`,
        { userAnsweringResponse: false }
      );
    } catch (error) {
      console.error('Error declining request:', error);
    }
   
    setDeclineMeetingModalVisible(false);
    setResponseSavedSuccessfullyModalVisible(true);
  }

  const handleRequestAccept = (requestId, meetingId, date, starttime, endtime) => {
    setAcceptRequestModalVisible(true);
    setSelectedMeetingOrRequest(requestId);
    setSelectedMeetingOrRequestTime({date, starttime, endtime});
  }

  const handleRequestAcceptConfirm = async () => {
    // first get the request object
    const requestObject = await axios.get(`http://localhost:8080/requests/${selectedMeetingOrRequest}`);
    if (!requestObject || !requestObject.data || !requestObject.data.meeting) {
      throw new Error('Invalid request data.');
    }

    // next, create the new booking
    const meetingObject = await axios.get(`http://localhost:8080/meetings/${requestObject.data.meeting}`);
    
    if (!meetingObject || !meetingObject.data) {
      throw new Error('Meeting not found.');
    }

    const newBooking = {attendee: userId, date: selectedMeetingOrRequestTime.date, starttime: selectedMeetingOrRequestTime.starttime, endtime: selectedMeetingOrRequestTime.endtime}
    const updatedBookings = [...meetingObject.data.bookings, newBooking];
    
    await axios.put(
      `http://localhost:8080/meetings/${requestObject.data.meeting}`,
      { bookings: updatedBookings }
    );

     // finally, delete the request
    try {
      await axios.delete(`http://localhost:8080/requests/${selectedMeetingOrRequest}`);
    } catch (error) {
      console.error('Error deleting request:', error);
    }

    setAcceptRequestModalVisible(false);
    setResponseSavedSuccessfullyModalVisible(true);
  }


  return (
    <div id='meeting-table'>
      <div id='meeting-table-header'>
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`tab-button ${selectedTab === tab ? 'tab-button--selected' : ''}`}
          >
            {tab}
            {tab === 'Requests' && requestMeetings?.length > 0 && (
              <GoDotFill className={`notification ${selectedTab === 'Requests' ? 'notification--selected' : ''}`}/>
            )}
          </div>
        ))}
      </div>
      <div style={{ paddingBottom: '10px', backgroundColor: 'white' }}>
        <div id='meeting-table-meetings'>
          {selectedMeetings?.length > 0 ? 
            selectedMeetings.map((meeting, index) => (
              <div style={{ marginBottom: '7px' }} key={index}>
                <MeetingRowComponent 
                  userId={userId}
                  meeting={meeting} 
                  typeOfMeeting={selectedTab}
                  requestAcceptCallback={handleRequestAccept}
                  requestDeclineCallback={handleRequestDecline}
                  meetingDeclineCallback={handleMeetingDecline}
                  meetingCancelCallback={handleMeetingCancel}
                /> 
              </div>
            )) : <div className='centered' >{loading ? 'Loading meetings...' : noMeetingsMessages[selectedTab]}</div> 
          }
        </div>
      </div>
      {/* Cancel Meeting Modal */}
      <Modal
        visible={cancelMeetingModalVisible}
        title="Cancel Meeting?"
        message="Are you sure you want to cancel this meeting?"
        primaryButtonLabel="Yes"
        primaryButtonCallback={() => handleMeetingCancelConfirm()}
        secondaryButtonLabel="No"
        secondaryButtonCallback={() => setCancelMeetingModalVisible(false)}
      />

      {/* Decline Meeting Modal */}
      <Modal
        visible={declineMeetingModalVisible}
        title="Decline Meeting?"
        message="Are you sure you don't want to attend this meeting?"
        primaryButtonLabel="Yes"
        primaryButtonCallback={() => handleMeetingDeclineConfirm()}
        secondaryButtonLabel="No"
        secondaryButtonCallback={() => setDeclineMeetingModalVisible(false)}
      />

      {/* Decline Request Modal */}
      <Modal
        visible={declineRequestModalVisible}
        title="Decline Request?"
        message="Are you sure you want to decline this request?"
        primaryButtonLabel="Yes"
        primaryButtonCallback={() => handleRequestDeclineConfirm()}
        secondaryButtonLabel="No"
        secondaryButtonCallback={() => setDeclineRequestModalVisible(false)}
      />

      {/* Accept Request Modal */}
      <Modal
        visible={acceptRequestModalVisible}
        title="Accept Meeting Request?"
        message="Are you sure you want to accept this request?"
        primaryButtonLabel="Yes"
        primaryButtonCallback={() => handleRequestAcceptConfirm()}
        secondaryButtonLabel="No"
        secondaryButtonCallback={() => setAcceptRequestModalVisible(false)}
      />

      {/* Response Saved Successfully Modal */}
      <Modal
        visible={responseSavedSuccessfullyModalVisible}
        title="Your response has been saved successfully!"
        closeButtonCallback={() => setResponseSavedSuccessfullyModalVisible(false)}
      />
    </div>
  );
};

export default MeetingTable;