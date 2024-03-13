import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Import emailjs library
import './styles/displaydata.css';
import homeIcon from './styles/home-outline.svg';
import { dotWave } from 'ldrs'

dotWave.register()



const DisplayData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const docId = queryParams.get('docId');

  const [loading, setLoading] = useState(true); // Track loading state
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'enrollmentData', docId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setEnrollmentData(docSnapshot.data());
        } else {
          console.error('Document not found');
        }
      } catch (error) {
        console.error('Error fetching user data from Firestore:', error);
      } finally {
        setLoading(false); // Update loading state when data retrieval is complete
      }
    };

    fetchData();
  }, [docId]);

  const handleSendEmail = async () => {
    try {
      // Use emailjs to send an email with the displayed data
      const templateParams = {
        to_email: email,
        studentNumber: enrollmentData.studentNumber || '',
        yearLevel: enrollmentData.yearLevel || '',
        semester: enrollmentData.semester || '',
        section: enrollmentData.section || '',
        program: enrollmentData.program || '', // Include the program in the email
      };

      await emailjs.send(
        'E-Registrar',
        'template_8nk8bzf',
        templateParams,
        'xbWaKQ4rtf30_Jzq3'
      );

      // Redirect to the home page after sending the email
      // Note: If you want to redirect, you can use the `Link` component from 'react-router-dom'
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

   return (
    <div>
      {loading && ( // Render loading animation if loading
        <div className="loading-animation-container">
          <l-dot-wave
            size="100"
            speed="1"
            color="white" 
          />
        </div>
      )}
      {!loading && ( // Render content if not loading
        <div className="display-data-container">
          <h2>Confirm Data for Enrollment</h2>
          {enrollmentData && (
            <div className="display-data-content">
              <p>Ticket Number: {enrollmentData.ticketNumber}</p>
              <p>Student Number: {enrollmentData.studentNumber}</p>
              <p>Program: {enrollmentData.program}</p>
              <p>Year Level: {enrollmentData.yearLevel}</p>
              <p>Semester: {enrollmentData.semester}</p>
              <p>Preferred Section: {enrollmentData.section}</p>
              {/* Add additional fields as needed */}
            </div>
          )}

          {/* Email input and Send button */}
          <div className="email-section">
            <label className="email-label">Email Address:</label>
            <div className="email-input-container">
              <input
                className="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="send-button-dd" onClick={handleSendEmail}>
                Send Email
              </button>
            </div>
          </div>

          {/* Home button */}
          <Link to="/" className="home-link">
            <button className="home-button">
              {/*<img
                src={homeIcon}
                alt="Enroll Icon"
                style={{ marginRight: '8px', width: '20px', height: '20px' }}
          />*/}
              <div style={{ fontSize: '20px' }}>Home</div>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DisplayData;