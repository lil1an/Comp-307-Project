import React from 'react'
import NavBar from '../components/NavBar'
import { useLocation } from 'react-router-dom';

function HomePage() {
  const location = useLocation();
  const { firstName } = location.state || {}; 

  return (
    <>
      <NavBar />
      <h1>Hello {firstName}!</h1>
      <h1>This is the Home Page After Users Login</h1>
    </>
  )
}

export default HomePage
