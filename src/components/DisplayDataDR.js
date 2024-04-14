import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './styles/displaydatadr.css';
import homeIcon from './styles/home-outline.svg';
import { dotWave } from 'ldrs'

dotWave.register()

const DisplayDataDR = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const docId = queryParams.get('docId');

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'documentsRequest', docId); // Assuming 'documentsRequestData' is your collection name
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setData(docSnapshot.data());
        } else {
          console.error('Document not found');
        }
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
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
        studentNumber: data?.studentNumber || '',
        yearLevel: data?.yearLevel || '',
        program: data?.program || '',
        documentToRequest: data?.documentToRequest || '',
        ticketNumber: data?.ticketNumber || '', // Include the ticket number
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
        <div className="display-data-container-dr">
          <h2>Confirm Data for Document Request</h2>
          {data && (
            <div className="display-data-content-dr">
              <p>Ticket Number: {data.ticketNumber}</p>
              <p>Student Number: {data.studentNumber}</p>
              <p>Requested Year Level: {data.yearLevel}</p>
              <p>Program: {data.program}</p>
              <p>Document to Request: {data.documentToRequest}</p>
              {/* Add additional fields as needed */}
            </div>
          )}

          {/* Email input and Send button */}
          <div className="email-section-dr">
            <label className="email-label-dr">Email Address:</label>
            <div className="email-input-container-dr">
              <input
                className="email-input-dr"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="send-button-dr" onClick={handleSendEmail}>
                Send Email
              </button>
            </div>
          </div>

          {/* Home button */}
          <Link to="/" className="home-link-dr">
            <button className="home-button-dr">
              <div style={{ fontSize: '20px' }}>Home</div>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DisplayDataDR;