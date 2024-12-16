import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import '../css/home-page.css';
import marty from '../assets/marty_happy 09.23.00 1.png';

function HomePage() {

  const [firstName, setFirstName] = useState('');
  const id = localStorage.getItem('userId');

  // Dropdown text to describe navbar utilities!
  const [showCreate, setShowCreate] = useState(false);
  const [showMeetings, setShowMeetings] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  
  // We want to show user first name after first render
  useEffect(() => { // Let's avoid giving access to user data directly.
    if (id){
      axios.get(`http://localhost:8080/users/${id}`)
        .then((res) => {
          setFirstName(res.data.firstName);
        })
        .catch((err) =>{
          console.error('Error fetching user by ID:', err.response?.data || err.message);
        })
    }
  }, [id])

  return (
    <>
      <NavBar userId={id} />
      <div className="home-page">
        <div className="home-page-content">
          <div className="hello-box">
            <div className="hello-text">
              <h1>Hello {firstName}!</h1>
              <p>Welcome back to Commit2Gather! Let's get your meetings setup!</p>
            </div>
            <div className="marty-image-container">
              <img className="marty-image" src={marty}/>
            </div>
          </div>

          <p className="dropdown-box-top-text">See below a list of the utilities accessible to you: </p>
          {/* Dropdowns are clicked on and off and change the display of the text on click*/}
          <div className="dropdown-box">
            <div className="dropdown-header" onClick={() => setShowCreate(!showCreate)}>
              <h2>Create</h2>
              {showCreate && <p style={{ display: showCreate ? "block" : "none" }}>
                Create an event for your meeting with you as the host. Edit details such as duration, location, and reccurence of the meeting over time.</p>}
            </div>
            <div className="dropdown-header" onClick={() => setShowMeetings(!showMeetings)}>
              <h2>Meetings</h2>
              {showMeetings && <p style={{ display: showMeetings ? "block" : "none" }}>
                All the information for your meetings is stored in this table. Contains all meetings your participate in, but also all participation requests you received.</p>}
            </div>
            <div className="dropdown-header" onClick={() => setShowDocuments(!showDocuments)}>
              <h2>Documents</h2>
              {showDocuments && <p style={{ display: showDocuments ? "block" : "none" }}>
                Take a look at all the document attachments from relevant meetings you participate in.</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
