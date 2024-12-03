import React from 'react';
import { Link } from 'react-router-dom'
import '../index.css';
import '../css/meeting-details.css';
import { FaRegClock } from "react-icons/fa";
import { CgAttachment } from "react-icons/cg";
import { MdEdit } from "react-icons/md";

/* Example usage from App.jsx:

  import profilePic from './assets/testProfilePic.png';

  const fakeMeeting = {
    id: '1234',
    hostName: 'Joseph Vybihal',
    hostProfilePic: profilePic,
    title: 'Professor Vybihal\'s Office Hours',
    duration: 30,
    location: 'In person, Leacock 910',
    description: 'Please come prepared with your project outline filled out. See attachment for required components.',
    attachment: 'COMP_307_project_outline.pdf',
  };

  <MeetingDetails meeting={fakeMeeting} showEditButton={true} /> 
*/

/* TO DO:
  - connect backend (will likely need to make changes depending on our entity format)
  - after backend is set up, links should open actual attachments
  - make sure duration is stored in mins or else make changes
*/


const MeetingDetails = ({ meeting, showEditButton=false }) => {
  const { id, hostName, hostProfilePic, title, duration, location, description, attachment } = meeting;

  return (
    <div id='meeting-details-container'>
      <div id='profile-container'>
        <img
          src={hostProfilePic}
          className='profile-circle'
          style={{ width: '100px', height: '100px', marginRight: '10px' }}
        />
        {hostName}
      </div>
      <h1>{title}</h1>
      <div id='meeting-time-container' className='row'>
        <FaRegClock id='clock-icon'/>
        {duration} mins
      </div>
      {location && (
        <div className='row'>
          <span className='bold-text'>Location: </span>
          <span>{location}</span>
        </div>
      )}
      {description && (
        <div className='row'>
         <span className='bold-text'>Description: </span>
         <span>{description}</span>
        </div>
      )}
      {attachment && (
        <div id='attachment-container' className='row'>
          <CgAttachment className='icon'/>
          <span className='bold-text'>Attachment: </span>
          <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley' target="_blank" rel="noopener noreferrer">
            {attachment}
          </a>
        </div>
      )}
      {showEditButton && (
        <div className='row centered'>
          <Link 
            to={`/edit?id=${id}`}
            id='edit-button' 
            className='border-base centered'
          >
            <MdEdit className='icon' />
            Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default MeetingDetails;