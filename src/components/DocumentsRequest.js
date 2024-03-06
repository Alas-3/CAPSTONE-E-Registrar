// DocumentsRequestForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './styles/docureq.css';

const DocumentsRequestForm = () => {
  const navigate = useNavigate();

  const [studentNumber, setStudentNumber] = useState('');
  const [yearLevel, setYearLevel] = useState('First Year'); // Set default to 'First Year'
  const [program, setProgram] = useState('');
  const [documentToRequest, setDocumentToRequest] = useState('');

  const handleContinue = async () => {
    // Validate that all fields are filled
    if (!studentNumber || !yearLevel || !program || !documentToRequest) {
      alert('Please fill in all fields before continuing.');
      return;
    }

    // Validate student number (allow digits and '-')
    const studentNumberRegex = /^[\d-]+$/;
    if (!studentNumberRegex.test(studentNumber)) {
      alert('Invalid student number. Please use only digits and hyphen (-).');
      return;
    }

    try {
      const documentsRequestRef = collection(db, 'documentsRequest');

      const requestData = {
        studentNumber,
        yearLevel,
        program,
        documentToRequest,
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(documentsRequestRef, requestData);

      // Navigate to the next page
      navigate(`/display-data-dr?docId=${docRef.id}`);
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };
  const handleBack = () => {
    // Navigate back to the previous page (you can replace '/previous-page' with your desired path)
    navigate('/');
  };
  

  return (
    <div className="form-container">
      <h2>Request Document Form</h2>
      <form>
        <label htmlFor="studentNumber">Student Number:</label>
        <input
          type="text"
          id="studentNumber"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />

        <label htmlFor="yearLevel">Current Year Level:</label>
        <select
          id="yearLevel"
          value={yearLevel}
          onChange={(e) => setYearLevel(e.target.value)}
        >
          <option value="" disabled selected hidden>Select Year Level</option>
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
          <option value="Fifth Year">Fifth Year</option>
        </select>

        <label htmlFor="program">Program:</label>
        <input
          type="text"
          id="program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        />

        <label htmlFor="documentToRequest">Document to Request:</label>
        <select
    id="documentToRequest"
    value={documentToRequest}
    onChange={(e) => setDocumentToRequest(e.target.value)}
  >
    <option value="" disabled selected hidden>
      Select a Document to Request
    </option>
    <option value="Diploma">Diploma</option>
    <option value="GWA Certificate">GWA Certificate</option>
    <option value="Permit to Transfer">Permit to Transfer</option>
    <option value="Letter of Request for the release of TOR from previous school">
      Letter of Request for the release of TOR from previous school
    </option>
    <option value="PTC Certificate of Completion">PTC Certificate of Completion</option>
    <option value="Certified True Copy of TOR from Previous School">
      Certified True Copy of TOR from Previous School
    </option>
    <option value="Transcript of Records (TOR)">Transcript of Records (TOR)</option>
    <option value="Transfer Credential">Transfer Credential</option>
    <option value="True Copy of Grades">True Copy of Grades</option>
    <option value="Certificate of No Pending Disciplinary Case">
      Certificate of No Pending Disciplinary Case
    </option>
    <option value="Certificate of Enrollment">Certificate of Enrollment</option>
    <option value="Certificate of Grading System">Certificate of Grading System</option>
    <option value="Certificate of Graduation/Completion">
      Certificate of Graduation/Completion
    </option>
  </select>

           <div className="button-container-docureq">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <button type="button" className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
      </form>
    </div>
  );
};

export default DocumentsRequestForm;