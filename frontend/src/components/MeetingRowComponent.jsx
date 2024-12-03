import React from 'react';
import { Link } from 'react-router-dom'
import '../index.css';
import '../css/meeting-row-component.css';
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

/* NOTE: meeting types are 'upcoming', 'request', 'past' or 'declined'

  Example Usage: meeting types are upcoming, requests, past or declined
    import profilePic from './assets/testProfilePic.png';

    const fakeMeeting = {
      id: '1234',
      hostName: 'Joseph Vybihal',
      hostProfilePic: profilePic,
      attendeeName:'Harry Potter',
      title: 'Professor Vybihal\'s Office Hours',
      duration: 30,
      starttime: '5:30pm',
      endtime: '6:00pm',
      date: 'December 16th, 2024',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
      location: 'In person, Leacock 910',
      description: 'Please come prepared with your project outline filled out. See attachment for required components.',
      attachment: 'COMP_307_project_outline.pdf',
    };

    <MeetingRowComponent 
      meeting={fakeMeeting} 
      typeOfMeeting='upcoming'
      acceptCallback={() => console.log('accept button clicked')}
      shareCallback={() => console.log('shared button clicked')}
      declineCallback={() => console.log('declined button clicked')}
    /> 
*/

/* TO DO:
    - remove the consts at the top of the file, we should be able to calculate them based on the meeting
*/

const MeetingRowComponent = ({ 
  meeting, 
  typeOfMeeting, 
  shareCallback, 
  acceptCallback, 
  declineCallback, 
}) => {

  // to do: remove this once we figure out how info comes from backend and can compute ourselves
  const userIsHostingMeeting = true;
  const isInPerson = false;

  const { 
    id, 
    hostName, 
    hostProfilePic = null, 
    attendeeNames,
    title, 
    starttime, 
    endtime, 
    date, 
    link = null,
  } = meeting;

  return (
    <div class='meeting-row-container'>
      <div class='meeting-row-datetime-container'>
        <span class='icon-margin'>
          {hostProfilePic ? 
            <img
              src={hostProfilePic}
              class='profile-circle'
              style={{height: '70px', width:'70px'}}
            />
            : <CgProfile style={{height: '70px', width:'70px'}}/>
          }
        </span>
        <div>
          {starttime}-{endtime}
          <div class='subtitle'>{date}</div>
        </div>
      </div>
      <div class='meeting-row-title-container'>
        <Link 
          to={`/meetings?id=${id}`}
          style={{color:'black', textDecoration:'none'}}
        >
          {title}
        </Link>
        <div class='subtitle'>
          {attendeeNames.length > 0 &&
          (attendeeNames.join(', ').length > 40
            ? attendeeNames.join(', ').slice(0, 40) + '...'
            : attendeeNames.join(', '))}
        </div>
      </div>
      <div class='meeting-row-button-container'>
        {typeOfMeeting == 'upcoming' && (
          <>
            {isInPerson ? 
              <div class='meeting-row-button green-background no-hover'>In Person</div>
              : 
              <Link 
                to={link}
                class='meeting-row-button green-background'
              >
                  Join
              </Link>
            }
            {userIsHostingMeeting && (
              <>
                <Link 
                  to={`/edit?id=${id}`}
                  class='meeting-row-button green-background'
                >
                  <MdEdit />
                </Link>

                <div 
                  class='meeting-row-button green-background'
                  onClick={shareCallback}
                >
                  <IoMdShare />
                </div>
              </>
            )}
            <div 
              class='meeting-row-button yellow-background'
              onClick={declineCallback}
            >
              <IoMdClose />
            </div>
          </>
        )}
        {typeOfMeeting == 'request' && (
          <>
            <div 
              class='meeting-row-button green-background'
              onClick={acceptCallback}
            >
              <FaCheck class='icon-margin'/>
              Accept
            </div>

            <div 
              class='meeting-row-button yellow-background'
              onClick={declineCallback}
            >
              <IoMdClose class='icon-margin'/>
              Decline
            </div>
          </>
        )}
        {typeOfMeeting == 'declined' && (
           <div 
           class='meeting-row-button green-background'
           onClick={acceptCallback}
         >
           <FaCheck class='icon-margin'/>
           Accept
         </div>
        )}
      </div>
    </div>
  );
};

export default MeetingRowComponent;