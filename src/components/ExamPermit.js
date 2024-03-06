// ExamPermit.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ExamPermit = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [program, setProgram] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [section, setSection] = useState('');

  const handleContinue = async () => {
    try {
      // Save data to Firestore
      const examPermitDataRef = collection(db, 'examPermitData');

      const examPermitData = {
        studentName,
        studentNumber,
        program,
        yearLevel,
        section,
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(examPermitDataRef, examPermitData);

      // Redirect to the display data page after saving to Firestore
      navigate(`/display-data-ep?docId=${docRef.id}`);
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  return (
    <div>
      <h2>Exam Permit Form</h2>
      <form>
        <label htmlFor="studentName">Student Name:</label>
        <input
          type="text"
          id="studentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />

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
        <input
          type="text"
          id="yearLevel"
          value={yearLevel}
          onChange={(e) => setYearLevel(e.target.value)}
        />

        <label htmlFor="section">Section:</label>
        <input
          type="text"
          id="section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />

        <button type="button" onClick={handleContinue}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default ExamPermit;
