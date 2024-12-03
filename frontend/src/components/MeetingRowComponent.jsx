import React from 'react';
import { Link } from 'react-router-dom'
import '../index.css';
import '../css/meeting-row-component.css';
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

/* NOTE: meeting types are 'Upcoming', 'Requests', 'Past' or 'Declined'

  Example Usage: meeting types are upcoming, requests, past or declined
    import profilePic from './assets/testProfilePic.png';

    const fakeMeeting = {
      id: '1234',
      hostName: 'Joseph Vybihal',
      hostProfilePic: profilePic,
      attendeeNames:'Harry Potter',
      title: 'Professor Vybihal\'s Office Hours',
      duration: 30,
      starttime: '5:30pm',
      endtime: '6:00pm',
      date: 'December 16th, 2024',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
      location: 'In person, Leacock 910',
      description: 'Please come prepared with your project outline filled out. See attachment for required components.',
      attachment: 'COMP_307_project_outline.pdf',
      typeOfMeeting: 'Upcoming',
    };

    <MeetingRowComponent 
      meeting={fakeMeeting} 
      typeOfMeeting='Upcoming'
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
    hostProfilePic = null, 
    attendeeNames,
    title, 
    starttime, 
    endtime, 
    date, 
    link = null,
  } = meeting;

  return (
    <div className='meeting-row-container'>
      <div className='meeting-row-datetime-container'>
        <span className='icon-margin'>
          {hostProfilePic ? 
            <img
              src={hostProfilePic}
              className='profile-circle'
              style={{height: '70px', width:'70px'}}
              alt='host profile'
            />
            : <CgProfile style={{height: '70px', width:'70px'}}/>
          }
        </span>
        <div>
          {starttime}-{endtime}
          <div className='subtitle'>{date}</div>
        </div>
      </div>
      <div className='meeting-row-title-container'>
        <Link 
          to={`/meetings?id=${id}`}
          style={{color:'black', textDecoration:'none'}}
        >
          {title}
        </Link>
        <div className='subtitle'>
          {attendeeNames.length > 0 &&
          (attendeeNames.join(', ').length > 40
            ? attendeeNames.join(', ').slice(0, 40) + '...'
            : attendeeNames.join(', '))}
        </div>
      </div>
      <div className='meeting-row-button-container'>
        {typeOfMeeting === 'Upcoming' && (
          <>
            {isInPerson ? 
              <div className='meeting-row-button green-background no-hover'>In Person</div>
              : 
              <Link 
                to={link}
                className='meeting-row-button green-background'
              >
                  Join
              </Link>
            }
            {userIsHostingMeeting && (
              <>
                <Link 
                  to={`/edit?id=${id}`}
                  className='meeting-row-button green-background'
                >
                  <MdEdit />
                </Link>

                <div 
                  className='meeting-row-button green-background'
                  onClick={shareCallback}
                >
                  <IoMdShare />
                </div>
              </>
            )}
            <div 
              className='meeting-row-button yellow-background'
              onClick={declineCallback}
            >
              <IoMdClose />
            </div>
          </>
        )}
        {typeOfMeeting === 'Requests' && (
          <>
            <div 
              className='meeting-row-button green-background'
              onClick={acceptCallback}
            >
              <FaCheck className='icon-margin'/>
              Accept
            </div>

            <div 
              className='meeting-row-button yellow-background'
              onClick={declineCallback}
            >
              <IoMdClose className='icon-margin'/>
              Decline
            </div>
          </>
        )}
        {typeOfMeeting === 'Declined' && (
           <div 
           className='meeting-row-button green-background'
           onClick={acceptCallback}
         >
           <FaCheck className='icon-margin'/>
           Accept
         </div>
        )}
      </div>
    </div>
  );
};

export default MeetingRowComponent;