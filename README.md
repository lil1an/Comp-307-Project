# <img src="./frontend/public/assets/shortlogo.png" alt="Logo" height="auto" width="40px" style="margin: none; padding: none"> Commit2Gather

A booking software that allows McGill University students and teachers alike to better manage their meetings/appointments. Commit2Gather uses a visually intuitive calendar view to keep track of your booking schedule. Users can create or edit their own meetings, and then notify invitees. Don't see a time frame corresponding to your availability? Request an alternate time in a few clicks!

## Team Knock Your SOCS Off

- Lilan Forsyth
- Lian Lambert
- Vincent St-Pierre

## Tech Stack

- React
- JavaScript
- Node.js
- MongoDB

## How to Deploy on SOCS

1. Use chrome
2. Be connected to McGill Network (remote: use McGill VPN)
3. Run `npm install` then `npm run build` in Frontend
4. Run `npm install` then `node app.js` in Backend
5. Go to https://fall2024-comp307-group13.cs.mcgill.ca/

## How to Deploy Locally

1. Use chrome
2. Run `npm install` then `npm run build` in Frontend
3. Run `npm install` then `node app.js` in Backend
4. Go to http://localhost:3000

## Division of Work

### **Lilan Forsyth**

- **Frontend Components:**
  - Navbar, Calendar, Date Selection, Timeslots, Event Details, Preview, Schedule Settings
- **Frontend Full Pages:**
  - Create & Edit Meeting, Preview & Book Meeting, Request Booking Meeting
- **Other:**
  - Initial Project Setup (Frontend and Backend), App Routing, Hosting Website on SOCS

---

### **Vincent St-Pierre**

- **Frontend Components:**
  - Sign-In Form, Register Form, Notifications Sidebar
- **Frontend Full Pages:**
  - Sign In, Register, Landing, Home, Documents
- **Backend:**
  - Login/Logout User
- **Other:**
  - Password Validation (Frontend and Backend), Notifications (Frontend and Backend)

---

### **Lian Lambert**

- **Frontend Components:**
  - Modal, Meeting Table, Meeting Rows, Meeting Details
- **Frontend Full Pages:**
  - Meetings Page
- **Backend:**
  - Initial Models, API Setup
- **Other:**
  - Some Request Booking Meeting Logic (Frontend)
