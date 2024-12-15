import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import EditPage from './pages/EditPage'
import MeetingsPage from './pages/MeetingsPage'
import HomePage from './pages/HomePage'
import DocumentsPage from './pages/DocumentsPage'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import BookingPage from './pages/BookingPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/meetings/:meetingId" element={<BookingPage />} />
      </Routes>
    </Router>
  )
}

export default App
