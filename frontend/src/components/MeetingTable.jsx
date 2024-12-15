import React, { useState, useEffect} from 'react';
import MeetingRowComponent from './MeetingRowComponent';
import '../css/meeting-table.css'
import '../index.css'
import { GoDotFill } from "react-icons/go";

const MeetingTable = ({ upcomingMeetings, hostingMeetings, requestMeetings, declinedMeetings, pastMeetings }) => {
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
            {tab == 'Requests' && requestMeetings?.length > 0 && (
              <GoDotFill className={`notification ${selectedTab == 'Requests' ? 'notification--selected' : ''}`}/>
            )}
          </div>
        ))}
      </div>
      <div id='meeting-table-meetings'>
        {selectedMeetings?.length > 0 ? 
          (selectedMeetings.map((meeting) => (
            <div style={{marginBottom: '7px'}} key={meeting.id}>
              <MeetingRowComponent 
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