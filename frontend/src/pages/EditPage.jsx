import NavBar from "../components/NavBar"
import { useLocation } from 'react-router-dom';

function EditPage() {

  // to retrieve appt id if editing an already existing appt
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const apptId = queryParams.get('id');

  return (
    <>
      <NavBar />
      <h1>This is the page to create and edit pages</h1>
      <div>Appt Id (for testing): {apptId || 'creating a new meeting, no id yet'}</div>
    </>
  )
}

export default EditPage
