import { Link, useLocation } from 'react-router-dom'
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

function NavBar({userId}) {

  const location = useLocation();

  // Login Status
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // These pages are before the user login
    return !(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/registration');
  });

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

  // Function for toggling login/logout
  const toggleLoggedIn = () => {
    setIsLoggedIn((prev)=> !prev) // Flipping state
  }

  // Function to set the user as not logged in when on the landing or login pages
   useEffect(() => {
    if (location.pathname === '/' || location.pathname === "/login" || location.pathname === "/registration") {
      setIsLoggedIn(false);
    }
    else{
      setIsLoggedIn(true);
    }
  }, [location.pathname]);

  return (
    <div id="nav">
      {isLoggedIn ? (
        <>
          <Link to="/home" state={{id: userId}}>
            <img src={logo} alt="logo" id="logo"/>
          </Link>
          <div id="login-options">
            <Link to="/edit" className="user-button" state={{id: userId}}>
              <FaPen className="icon2" />
              Create
            </Link>

            <Link to="/meetings" className="user-button" state={{id: userId}}>
              <IoPeople className="icon2" />
              Meetings
            </Link>

            <Link to="/documents" className="user-button" state={{id: userId}}>
              <HiDocument className="icon2" />
              Documents
            </Link>

            {/* Notification Icon with dot for new notifications*/}
            {isNewNotifs ? (<VscBellDot className="bell-icon" onClick={toggleNotifs} />
            ) : (<VscBell className="bell-icon" onClick={toggleNotifs} />)
            }

            <Link to="/" className="nav-button" onClick={toggleLoggedIn}>
              <FiLogIn className="icon1" />
              Logout
            </Link>

            {/* Notification Panel Popup Test with List*/}
            {isNotifsOpen && (
              <div id="notifs-panel">  {/*removed onMouseLeave={toggleNotifs} for now*/}
                <button id="close-notifs" onClick={toggleNotifs}> &times; </button>
                <div className="notifs-container">
                  <div className="notifs-top-bar">
                    <HiDocument className="notifs-logo" />
                    <a href="#" className="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p className="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p className="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>

                <div className="notifs-container">
                  <div className="notifs-top-bar">
                    <HiDocument className="notifs-logo" />
                    <a href="#" className="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p className="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p className="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>

                <div className="notifs-container">
                  <div className="notifs-top-bar">
                    <HiDocument className="notifs-logo" />
                    <a href="#" className="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p className="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p className="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>

                <div className="notifs-container">
                  <div className="notifs-top-bar">
                    <HiDocument className="notifs-logo" />
                    <a href="#" className="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p className="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p className="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>

                <div className="notifs-container">
                  <div className="notifs-top-bar">
                    <HiDocument className="notifs-logo" />
                    <a href="#" className="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p className="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p className="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>

                <div className="notifs-container">
                  <div className="notifs-top-bar">
                    <HiDocument className="notifs-logo" />
                    <a href="#" className="notifs-title"><b><u>Professor's Vyhibal Office Hours</u></b></a>
                  </div>
                  <p className="notifs-desc">A document was attached to this meeting you are attending.</p>
                  <p className="notifs-desc">Sunday, November 24, 2024, 8:19pm, by Joseph Vyhibal</p>
                </div>
              
                
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
