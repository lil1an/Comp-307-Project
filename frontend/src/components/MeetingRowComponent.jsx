import React from 'react';
import { Link } from 'react-router-dom'
import '../index.css';
import '../css/meeting-row-component.css';
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

// NOTE: meeting types are 'Upcoming', 'Hosting', 'Requests', 'Past' or 'Declined'

const MeetingRowComponent = ({ 
  userId,
  meeting, 
  typeOfMeeting, 
  meetingDeclineCallback, 
  requestDeclineCallback, 
  requestAcceptCallback,
  meetingCancelCallback
}) => {
  const {
    requestId,
    id,
    hostProfilePic = null,
    hostName,
    attendeeName,
    title,
    starttime,
    endtime,
    date,
    userIsHostingMeeting,
  } = meeting

  const dateObject = new Date(date)

  // Format the date in UTC
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // Force UTC
  })

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Share link copied to clipboard!')
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }

  return (
    <div className="meeting-row-container">
      <div className="meeting-row-datetime-container">
        <span className="icon-margin">
          {hostProfilePic ? (
            <img
              src={hostProfilePic}
              className="profile-circle"
              style={{ height: '50px', width: '50px' }}
              alt="host profile"
            />
          ) : (
            <CgProfile style={{ height: '50px', width: '50px' }} />
          )}
        </span>
        {typeOfMeeting !== 'Hosting' && 
          <div>
            {starttime}-{endtime}
            <div className="subtitle">{formattedDate}</div>
          </div>
        }
      </div>
      <div className="meeting-row-title-container">
        <a 
          href={`/meetings/${id || meeting._id}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: 'black', textDecoration: 'none' }}
        >
          {title}
        </a>
        {typeOfMeeting !== 'Hosting' &&
          <div className="subtitle">
            {userIsHostingMeeting ? `Attendee: ${attendeeName}` : `Host: ${hostName}`}
          </div>
        }
      </div>
      <div className="meeting-row-button-container">
        {(typeOfMeeting === 'Upcoming' || typeOfMeeting === 'Hosting') && (
          <>
            {(userIsHostingMeeting || typeOfMeeting === 'Hosting') && (
              <>
                <Link
                  to={{
                    pathname: '/edit',
                    search: `?id=${id || meeting._id}`,
                    state: { userId: userId },
                  }}
                  className="meeting-row-button green-background"
                >
                  <MdEdit />
                </Link>

                <div
                  className="meeting-row-button green-background"
                  onClick={() =>
                    copyToClipboard(`${window.location.origin}/meetings/${id || meeting._id}`)
                  }
                >
                  <FaCopy />
                </div>
              </>
            )}
            <div
              className="meeting-row-button yellow-background"
              onClick={() =>
                userIsHostingMeeting
                  ? meetingCancelCallback(id, date, starttime, endtime)
                  : meetingDeclineCallback(id, date, starttime, endtime)
              }
            >
              <IoMdClose />
            </div>
          </>
        )}
        {typeOfMeeting === 'Requests' && (
          <>
            <div
              className="meeting-row-button green-background"
              onClick={() =>
                requestAcceptCallback(requestId, id, date, starttime, endtime)
              }
            >
              <FaCheck className="icon-margin" />
              Accept
            </div>

            <div
              className="meeting-row-button yellow-background"
              onClick={() =>
                requestDeclineCallback(requestId, id, date, starttime, endtime)
              }
            >
              <IoMdClose className="icon-margin" />
              Decline
            </div>
          </>
        )}
        {typeOfMeeting === 'Declined' && (
          <div
            className="meeting-row-button green-background"
            onClick={() =>
              requestAcceptCallback(requestId, id, date, starttime, endtime)
            }
          >
            <FaCheck className="icon-margin" />
            Accept
          </div>
        )}
      </div>
    </div>
  )
};

export default MeetingRowComponent;