import React, { useState } from 'react';
import MeetingRowComponent from './MeetingRowComponent';
import '../css/meeting-table.css'
import '../index.css'
import { GoDotFill } from "react-icons/go";

/* For example usage, ask Lian --> too long to put here

To Do: 
    - standardize meeting types (e.g. upcoming vs Upcoming, request vs Request) once backend figure out
    - ^ figure out where meeting type gets calculated
    - add logic for accept, share and decline callbacks on parent page
    - remove magic strings
*/

const MeetingTable = ({ meetings }) => {
  const tabs = ['Upcoming', 'Requests', 'Declined', 'Past'];

  const upcomingMeetings = meetings.filter(meeting => meeting.typeOfMeeting === 'Upcoming');
  const requestMeetings = meetings.filter(meeting => meeting.typeOfMeeting === 'Requests');
  const declinedMeetings = meetings.filter(meeting => meeting.typeOfMeeting === 'Declined');
  const pastMeetings = meetings.filter(meeting => meeting.typeOfMeeting === 'Past');

  const tabsToMeetings = {
    'Upcoming': upcomingMeetings, 
    'Requests': requestMeetings, 
    'Declined': declinedMeetings, 
    'Past': pastMeetings
  }

  const noMeetingsMessages = {
    'Upcoming': 'No upcoming meetings to display', 
    'Requests': 'No pending meeting requests', 
    'Declined': 'No declined meetings', 
    'Past': 'No past meetings to display',
  }

  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [selectedMeetings, setSelectedMeetings] = useState(upcomingMeetings);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setSelectedMeetings(tabsToMeetings[tab]);
  };

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
            {console.log(tab === 'Requests')}
            {tab == 'Requests' && requestMeetings.length > 0 && (
              <GoDotFill className={`notification ${selectedTab == 'Requests' ? 'notification--selected' : ''}`}/>
            )}
          </div>
        ))}
      </div>
      <div id='meeting-table-meetings'>
        {selectedMeetings.length > 0 ? 
          (selectedMeetings.map((meeting) => (
            <div style={{marginBottom: '7px'}}>
              <MeetingRowComponent 
                key={meeting.id}
                meeting={meeting} 
                typeOfMeeting={selectedTab}
                acceptCallback={() => console.log('accept button clicked')}
                shareCallback={() => console.log('shared button clicked')}
                declineCallback={() => console.log('declined button clicked')}
              /> 
            </div>
          ))) : <div className='centered' >{noMeetingsMessages[selectedTab]}</div> 
        }

      </div>
    </div>
  );
};

export default MeetingTable;