import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './styles/Enrollment.css'

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [program, setProgram] = useState(''); // New field for program

  const handleContinue = async () => {
    // Simple form validation
    if (!studentNumber || !yearLevel || !semester || !section || !program) {
      alert('Please fill in all fields.');
      return;
    }

    // More specific validation for Student Number
    const studentNumberRegex = /^[0-9-]+$/;
    if (!studentNumber.match(studentNumberRegex)) {
      alert('Please enter a valid Student Number.');
      return;
    }

    try {
      const enrollmentDataRef = collection(db, 'enrollmentData');

      const enrollmentData = {
        studentNumber,
        yearLevel,
        semester,
        section,
        program, // Include the program in the data
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(enrollmentDataRef, enrollmentData);

      // Navigate to the next page (you can replace '/display-data' with your desired path)
      navigate(`/display-data?docId=${docRef.id}`);
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  const handleBack = () => {
    // Navigate back to the home page
    navigate('/');
  };

  return (
    <div className="enrollment-form-container">
      <h2>Enrollment Form</h2>
      <form className="enrollment-form">
        <label htmlFor="studentNumber">Student Number:</label>
        <input
          type="text"
          id="studentNumber"
          value={studentNumber}
          onChange={(e) => setStudentNumber(e.target.value)}
        />

        <label htmlFor="program">Program:</label>
        <input
          type="text"
          id="program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        />

        <label htmlFor="yearLevel">Year Level:</label>
        <select
          id="yearLevel"
          value={yearLevel}
          onChange={(e) => setYearLevel(e.target.value)}
        >
          <option value="" disabled selected hidden>
      Select Year Level
    </option>
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
          <option value="Fifth Year">Fifth Year</option>
        </select>

        <label htmlFor="semester">Semester:</label>
        <select
          id="semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="" disabled selected hidden>
      Select Semester
    </option>
          <option value="First Semester">First Semester</option>
          <option value="Second Semester">Second Semester</option>
          <option value="Summer">Summer</option>
        </select>

        <label htmlFor="section">Preferred Section:</label>
        <input
          type="text"
          id="section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />

        

        <div className="button-container-enroll">
          <button type="button" onClick={handleBack} className="back-button">
            Back
          </button>
          <button type="button" onClick={handleContinue} className="continue-button">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;