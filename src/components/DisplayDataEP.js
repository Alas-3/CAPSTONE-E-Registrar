// DisplayDataEP.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Import emailjs library

const DisplayDataEP = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const docId = queryParams.get('docId');

  const [examPermitData, setExamPermitData] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'examPermitData', docId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setExamPermitData(docSnapshot.data());
        } else {
          console.error('Document not found');
        }
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, [docId]);

  const handleSendEmail = async () => {
    try {
      // Use emailjs to send an email with the displayed data
      const templateParams = {
        to_email: email,
        studentName: examPermitData?.studentName || '',
        studentNumber: examPermitData?.studentNumber || '',
        program: examPermitData?.program || '',
        yearLevel: examPermitData?.yearLevel || '',
        section: examPermitData?.section || '',
      };

      await emailjs.send(
        'E-Registrar',
        'template_xralfkl', // Update with your email template ID
        templateParams,
        'xbWaKQ4rtf30_Jzq3' // Update with your email service ID
      );

      // Redirect to the home page after sending the email
      // Note: If you want to redirect, you can use the `Link` component from 'react-router-dom'
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <h2>Display Exam Permit Data</h2>
      {examPermitData && (
        <div>
          <p>Student Name: {examPermitData.studentName}</p>
          <p>Student Number: {examPermitData.studentNumber}</p>
          <p>Program: {examPermitData.program}</p>
          <p>Year Level: {examPermitData.yearLevel}</p>
          <p>Section: {examPermitData.section}</p>
          {/* Add additional fields as needed */}
        </div>
      )}

      {/* Email input and Send button */}
      <div>
        <label>Email Address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={handleSendEmail}>Send</button>
      </div>

      {/* Home button */}
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default DisplayDataEP;
