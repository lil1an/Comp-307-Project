import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../css/nav-bar.css'
import { useState, useEffect } from 'react'

// Icon Imports
import { FiLogIn } from 'react-icons/fi'
import { VscBell } from "react-icons/vsc";
import { VscBellDot } from "react-icons/vsc";
import { IoPersonAdd } from 'react-icons/io5'
import { FaPen } from 'react-icons/fa'
import { IoPeople } from 'react-icons/io5'
import { HiDocument } from 'react-icons/hi2'
import { BsExclamation } from "react-icons/bs";

function NavBar() {
  // Login Status
  const [isLoggedIn, setIsLoggedIn] = useState(true) // change manually here

  // To Do Later: Write login authenticator logic (manually change for now in the above line)

  // Notification Panel Toggle (Bell Icon)
  const [isNotifsOpen, setIsNotifsOpen] = useState(false)

  // Notification Bell with new notifications
  const [isNewNotifs, setIsNewNotifs] = useState(true)

  // Function for toggling notifications
  const toggleNotifs = () => {
    setIsNotifsOpen((prev) => !prev) // Flipping state
    
    // Removing new notification dot if applicable
    if(isNewNotifs){
      toggleNewNotifs()
    }
  }

  // Function for toggling new notification symbol
  const toggleNewNotifs = () => {
    setIsNewNotifs((prev) => !prev) // Flipping state
  }

  return (
    <div id="nav">
      {isLoggedIn ? (
        <>
          <Link to="/home">
            <img src={logo} alt="logo" id="logo" />
          </Link>
          <div id="login-options">
            <Link to="/edit" class="user-button">
              <FaPen class="icon2" />
              Create
            </Link>

            <Link to="/meetings" class="user-button">
              <IoPeople class="icon2" />
              Meetings
            </Link>

            <Link to="/documents" class="user-button">
              <HiDocument class="icon2" />
              Documents
            </Link>

            {/* Notification Icon with dot for new notifications*/}
            {isNewNotifs ? (<VscBellDot class="bell-icon" onClick={toggleNotifs} />
            ) : (<VscBell class="bell-icon" onClick={toggleNotifs} />)
            }

            <Link to="/" class="nav-button">
              <FiLogIn className="icon1" />
              Logout
            </Link>

            {/* Notification Panel Popup Test with List*/}
            {isNotifsOpen && (
              <div id="notifs-panel" onMouseLeave={toggleNotifs}>
                <button id="close-notifs" onClick={toggleNotifs}> &times; </button>
                <div class="notifs-container">
                  <div class="notifs-top-bar">
                    <HiDocument class="notifs-logo" />
                    <a href="#" class="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p class="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p class="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>

                <div class="notifs-container">
                  <div class="notifs-top-bar">
                    <HiDocument class="notifs-logo" />
                    <a href="#" class="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p class="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p class="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>

                <div class="notifs-container">
                  <div class="notifs-top-bar">
                    <HiDocument class="notifs-logo" />
                    <a href="#" class="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p class="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p class="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>

                <div class="notifs-container">
                  <div class="notifs-top-bar">
                    <HiDocument class="notifs-logo" />
                    <a href="#" class="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p class="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p class="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>

                <div class="notifs-container">
                  <div class="notifs-top-bar">
                    <HiDocument class="notifs-logo" />
                    <a href="#" class="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p class="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p class="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>

                <div class="notifs-container">
                  <div class="notifs-top-bar">
                    <HiDocument class="notifs-logo" />
                    <a href="#" class="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p class="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p class="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>
              
                
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <img src={logo} alt="logo" id="logo" />
          <div id="logout-options">
            <Link to="/login" class="nav-button">
              <FiLogIn className="icon1" />
              Login
            </Link>

            <Link to="/registration" class="nav-button">
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
