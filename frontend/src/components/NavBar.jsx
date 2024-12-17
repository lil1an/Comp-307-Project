import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../css/nav-bar.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

// Icon Imports
import { FiLogIn } from 'react-icons/fi'
import { VscBell } from 'react-icons/vsc'
import { VscBellDot } from 'react-icons/vsc'
import { IoPersonAdd } from 'react-icons/io5'
import { FaPen } from 'react-icons/fa'
import { IoPeople } from 'react-icons/io5'
import { HiDocument } from 'react-icons/hi2'

function NavBar() {
  const id = localStorage.getItem('userId')
  const location = useLocation()

  // Login Status
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // These pages are before the user login
    return !(
      location.pathname === '/' ||
      location.pathname === '/login' ||
      location.pathname === '/registration'
    )
  })

  // Notification Panel Toggle (Bell Icon)
  const [isNotifsOpen, setIsNotifsOpen] = useState(false)

  // Notification Bell with new notifications
  const [hasUnreadNotification, setHasUnreadNotification] = useState(false)

  // Notifications content
  const [userNotifications, setUserNotifications] = useState([])

  // Function for toggling notifications
  const toggleNotifs = () => {
    setIsNotifsOpen((prev) => !prev) // Flipping state

    // Removing new notification dot if applicable
    if (hasUnreadNotification) {
      updateUnreadNotification()
    }
  }

  // Function for toggling new notification symbol
  const updateUnreadNotification = async () => {
    try {
      if (id) {
        const userResponse = await axios.get(`/users/${id}`)
        const userData = userResponse.data

        // Notifications have been read.
        const updatedUserData = { ...userData, hasUnreadNotification: false }
        await axios.put(`/users/${id}`, updatedUserData)
        setHasUnreadNotification(false) // Update state
      }
    } catch (error) {
      console.error('Error marking notifications as read:', error)
    }
  }

  const checkUnreadNotification = async () => {
    try {
      if (id) {
        const response = await axios.get(`/users/${id}`)
        setHasUnreadNotification(response.data.hasUnreadNotification)
      }
    } catch (error) {
      console.error('Error fetching unread notifications status:', error)
    }
  }

  // We want on page load to set hasUnreadNotification with the user!
  useEffect(() => {
    if (id) {
      checkUnreadNotification()
    }
  }, [id])

  // Function for toggling login/logout
  const toggleLoggedIn = () => {
    if (isLoggedIn) {
      localStorage.removeItem('userId')
    }

    setIsLoggedIn((prev) => !prev) // Flipping state
  }

  // Function to set the user as not logged in when on the landing or login pages
  useEffect(() => {
    if (
      location.pathname === '/' ||
      location.pathname === '/login' ||
      location.pathname === '/registration'
    ) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }, [location.pathname])

  // Function to fetch notifications for the current user.
  const getUserNotifications = async () => {
    try {
      if (id) {
        const userResponse = await axios.get(`/notifications/userId/${id}`)

        const sortedNotifications = userResponse.data.sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        ) // Sorting by time

        const updatedNotifications = await Promise.all(
          sortedNotifications.map(async (notif) => {
            try {
              const meetingResponse = await axios.get(
                `/meetings/${notif.meeting}`
              )
              return { ...notif, meetingTitle: meetingResponse.data.title }
            } catch (error) {
              console.error('Error fetching meeting title:', error)
              return { ...notif, meetingTitle: 'Unknown Meeting' }
            }
          })
        )
        setUserNotifications(updatedNotifications)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  // Render notifications!
  useEffect(() => {
    if (id) getUserNotifications()
  }, [id])

  return (
    <div id="nav">
      {isLoggedIn ? (
        <>
          <Link to="/home">
            <img src={logo} alt="logo" id="logo" />
          </Link>
          <div id="login-options">
            <Link to="/edit" className="user-button">
              <FaPen className="icon2" />
              Create
            </Link>

            <Link to="/meetings" className="user-button">
              <IoPeople className="icon2" />
              Meetings
            </Link>

            <Link to="/documents" className="user-button">
              <HiDocument className="icon2" />
              Documents
            </Link>

            {/* Notification Icon with dot for new notifications*/}
            {hasUnreadNotification ? (
              <VscBellDot className="bell-icon" onClick={toggleNotifs} />
            ) : (
              <VscBell className="bell-icon" onClick={toggleNotifs} />
            )}

            <Link to="/" className="nav-button" onClick={toggleLoggedIn}>
              <FiLogIn className="icon1" />
              Logout
            </Link>

            {/* Notification Panel Popup Test with List*/}
            {isNotifsOpen && (
              <div id="notifs-panel">
                <button id="close-notifs" onClick={toggleNotifs}>
                  {' '}
                  &times;{' '}
                </button>

                {/* This will be the template we use for each user notifications*/}
                {userNotifications.length > 0 ? (
                  userNotifications.map(
                    (notif, index) =>
                      notif &&
                      notif.content && (
                        <div className="notifs-container" key={index}>
                          <div className="notifs-top-bar">
                            <HiDocument className="notifs-logo" />
                            <a href="#" className="notifs-title">
                              <b>
                                <u>{notif.meetingTitle}</u>
                              </b>
                            </a>
                          </div>
                          <p className="notifs-desc">{notif.content}</p>
                          <p className="notifs-desc">
                            {new Date(notif.time).toLocaleString()}
                          </p>
                        </div>
                      )
                  )
                ) : (
                  <p>No new notifications.</p>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <img src={logo} alt="logo" id="logo" />
          <div id="logout-options">
            <Link to="/login" className="nav-button">
              <FiLogIn className="icon1" />
              Login
            </Link>

            <Link to="/registration" className="nav-button">
              <IoPersonAdd className="icon1" />
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default NavBar
