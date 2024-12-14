import NavBar from "../components/NavBar"
import MeetingTable from '../components/MeetingTable'
import Modal from '../components/Modal'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const [meetingsUpcoming, setMeetingsUpcoming] = useState([]);
const [meetingsHosting, setMeetingsHosting] = useState([]);
const [meetingsRequested, setMeetingsRequested] = useState([]);
const [meetingsDeclined, setMeetingsDeclined] = useState([]);
const [meetingsPast, setMeetingsPast] = useState([]);

const location = useLocation();
const { id } = location.state || {}; 

/*
To Do: 
    - add logic for accept, share and decline callbacks
*/

useEffect(() => {
  if (id){
    const fetchMeetingsData = async (id) => {
      try {
        const [
          meetingsUpcomingResponse,
          meetingsHostedResponse,
          meetingsRequestedResponse,
          meetingsDeclinedResponse,
          meetingsPastResponse
        ] = await Promise.all([
          axios.get(`http://localhost:8080/meetingsUpcoming/${id}`),
          axios.get(`http://localhost:8080/meetingsHosted/${id}`),
          axios.get(`http://localhost:8080/meetingsRequested/${id}`),
          axios.get(`http://localhost:8080/meetingsDeclined/${id}`),
          axios.get(`http://localhost:8080/meetingsPast/${id}`)
        ]);
    
        setMeetingsUpcoming(meetingsUpcomingResponse.data);
        setMeetingsHosting(meetingsHostedResponse.data);
        setMeetingsRequested(meetingsRequestedResponse.data);
        setMeetingsDeclined(meetingsDeclinedResponse.data);
        setMeetingsPast(meetingsPastResponse.data);
      } catch (err) {
        console.error('Error fetching meetings data for user:', err.response?.data || err.message);
      }
    };
    fetchMeetingsData();
  }
}, [id]);

const styles = {
  'meeting-table-container': {
    display: 'flex',
    justifyContent: 'center',
    height: 'calc(100vh - 65px)',
    backgroundColor: '#f4f4f4',
    paddingTop: '80px'
  },
};

function MeetingsPage() {
  return (
    <>
      <NavBar />
      <div style={styles["meeting-table-container"]}>
        <div style={{width: '80%'}}>
          <MeetingTable 
            upcomingMeetings={meetingsUpcoming} 
            hostingMeetings={meetingsHosting} 
            requestMeetings={meetingsRequested} 
            declinedMeetings={meetingsDeclined} 
            pastMeetings={meetingsPast} />
        </div>
      </div>
    </>
  )
}

export default MeetingsPage
