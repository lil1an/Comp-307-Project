import React from 'react';
import NavBar from '../components/NavBar';
import '../css/landing-page.css';
import marty from '../assets/marty_happy 09.23.00 1.png';
import preview from '../assets/Landing Page Website Preview.jpg'


function LandingPage() {
  return (
    <>
      <NavBar />
      
      <div className='landing-page'>
        <div className='landing-page-content'>
          <div className='landing-page-text-box'>
            <div className='text-box-left'>
              <h1 className='text-box-title'>Welcome to Commit<span className="red-text">2</span>Gather!</h1>
              <p className='text-box-content'>This booking tool allows McGill University students and teachers alike to better manage their meetings/appointments.
                  Commit2Gather uses a visually intuitive calendar view to keep track of your booking schedule.
                  Users can create or edit their own meetings, and then notify invitees. All future & past meetings can be seen on the Meetings page!</p>
            </div>
            <div className='text-box-right'>
              <img className='marty-image' src={marty}></img>
            </div>        
          </div>
          <img className='preview-image' src={preview}></img>
        </div>
      </div>
    </>
  )
}

export default LandingPage
