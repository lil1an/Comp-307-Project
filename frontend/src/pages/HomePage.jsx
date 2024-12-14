import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function HomePage() {

  const [firstName, setFirstName] = useState('');
  const location = useLocation();
  const { id } = location.state || {}; 
  
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
      <h1>Hello {firstName}!</h1>
      <h1>This is the Home Page After Users Login</h1>
    </>
  )
}

export default HomePage
