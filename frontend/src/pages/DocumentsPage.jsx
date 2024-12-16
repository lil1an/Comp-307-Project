import NavBar from '../components/NavBar'
import React, { useState } from 'react';
import { FaDownload, FaSearch, FaSort } from 'react-icons/fa';
import '../css/documents-page.css'; 

function DocumentsPage() {

  // Implementation of a counter for the number of items shown.
  const [itemsPerPage, setItemsPerPage] = useState(20);

  return (
    <>
      <NavBar />

      {/* Relevant Filters for meetings. We know documents are mapped with meetings */}
      <div className="documents-page">

            <div className="filter-section">
                <label>
                    <input type="checkbox" /> My Meetings
                </label>
                <label>
                    <input type="checkbox" /> Attended Meetings
                </label>
                <label>
                    <input type="checkbox" /> Upcoming
                </label>
                <label>
                    <input type="checkbox" /> Past
                </label>

                <div className="search-bar">
                    <input type="text" placeholder="Search documents..." />
                    <FaSearch className="search-icon" />
                </div>

                <div className="items-per-page">
                    <label>
                        Show:
                        <input type="number" value={itemsPerPage} 
                          onChange={(e) => setItemsPerPage(e.target.value)} min="1" />
                         items
                    </label>
                </div>
            </div>

            {/* Document table with column header sorters */}
            <div className="documents-table">
                <div className="table-header">
                    <div className="header-item">Document Name <FaSort className="sort-icon" /></div>
                    <div className="header-item">Meeting Title <FaSort className="sort-icon" /></div>
                    <div className="header-item">Upload Date <FaSort className="sort-icon" /></div>
                    <div className="header-item">Uploaded By <FaSort className="sort-icon" /></div>
                </div>

                {/* Documents examples */}
                <div className="document-row">
                    <div className="document-name">Harry Potter and the Philosopher's Stone</div>
                    <div className="meeting-title">Reading Club Daily Meeting</div>
                    <div className="upload-date">2024-12-12</div>
                    <div className="uploaded-by">Dumbledore</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div>

                <div className="document-row">
                    <div className="document-name">COMP307 - Final Project Guidelines v10</div>
                    <div className="meeting-title">Joseph Vyhibal's Office Hours</div>
                    <div className="upload-date">2024-12-09</div>
                    <div className="uploaded-by">Joseph Vyhibal</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div>

                <div className="document-row">
                    <div className="document-name">COMP307 - Final Project Guidelines v9</div>
                    <div className="meeting-title">Joseph Vyhibal's Office Hours</div>
                    <div className="upload-date">2024-12-08</div>
                    <div className="uploaded-by">Joseph Vyhibal</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div>

                <div className="document-row">
                    <div className="document-name">COMP307 - Final Project Guidelines v8</div>
                    <div className="meeting-title">Joseph Vyhibal's Office Hours</div>
                    <div className="upload-date">2024-12-07</div>
                    <div className="uploaded-by">Joseph Vyhibal</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div>

                <div className="document-row">
                    <div className="document-name">COMP307 - Final Project Guidelines v7</div>
                    <div className="meeting-title">Joseph Vyhibal's Office Hours</div>
                    <div className="upload-date">2024-12-06</div>
                    <div className="uploaded-by">Joseph Vyhibal</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div>

                <div className="document-row">
                    <div className="document-name">COMP307 - Final Project Guidelines v6</div>
                    <div className="meeting-title">Joseph Vyhibal's Office Hours</div>
                    <div className="upload-date">2024-12-05</div>
                    <div className="uploaded-by">Joseph Vyhibal</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div>

                <div className="document-row">
                    <div className="document-name">COMP307 - Final Project Guidelines v5</div>
                    <div className="meeting-title">Joseph Vyhibal's Office Hours</div>
                    <div className="upload-date">2024-12-04</div>
                    <div className="uploaded-by">Joseph Vyhibal</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div>

                <div className="document-row">
                    <div className="document-name">COMP307 - Final Project Guidelines v4</div>
                    <div className="meeting-title">Joseph Vyhibal's Office Hours</div>
                    <div className="upload-date">2024-12-03</div>
                    <div className="uploaded-by">Joseph Vyhibal</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div>

                <div className="document-row">
                    <div className="document-name">COMP307 - Final Project Guidelines v3</div>
                    <div className="meeting-title">Joseph Vyhibal's Office Hours</div>
                    <div className="upload-date">2024-12-02</div>
                    <div className="uploaded-by">Joseph Vyhibal</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div>

                <div className="document-row">
                    <div className="document-name">COMP307 - Final Project Guidelines v2</div>
                    <div className="meeting-title">Joseph Vyhibal's Office Hours</div>
                    <div className="upload-date">2024-12-01</div>
                    <div className="uploaded-by">Joseph Vyhibal</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div>

                {/* <div className="document-row">
                    <div className="document-name">COMP307 - Final Project Guidelines</div>
                    <div className="meeting-title">Joseph Vyhibal's Office Hours</div>
                    <div className="upload-date">2024-11-30</div>
                    <div className="uploaded-by">Joseph Vyhibal</div>
                    <div className="download-icon">
                        <FaDownload />
                    </div>
                </div> */}


            </div>
        </div>
    </>
  )
}

export default DocumentsPage;
