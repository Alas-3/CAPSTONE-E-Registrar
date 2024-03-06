import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import './styles/Home.css';
import enrollIcon from './styles/school-outline.svg';
import docuIcon from './styles/documents-outline.svg';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [enrollButtonDisabled, setEnrollButtonDisabled] = useState(false);

  const handleEnroll = () => {
    // Navigate to the Enrollment page only if the user is paid
    if (!enrollButtonDisabled) {
      navigate('/enrollment');
    }
  };

  const handleGeneratePermit = () => {
    // Navigate to the Enrollment page
    navigate('/enrollment');
  };

  const handleRequestDocuments = () => {
    // Navigate to the Documents Request page (you can replace '/documents-request' with your desired path)
    navigate('/documents-request');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userDocRef = doc(db, 'users', user.uid);

        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              setUserData(userData);

              // Check if the user is paid
              if (userData.isPaid) {
                // User is paid, enable the "Enroll" button
                setEnrollButtonDisabled(false);
              } else {
                // User is not paid, disable the "Enroll" button
                setEnrollButtonDisabled(true);
              }
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      } else {
        // User is not authenticated, navigate to the root path
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };

  return (
    <>
      
      <div className="actions">
     <button className="enroll-button" onClick={handleEnroll}>
        <img
            src={enrollIcon}
            alt="Enroll Icon"
            style={{ marginBottom: '8px', width: '120px', height: '120px' }}
          />
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Enroll</div>
      </button>


      <button
        className="request-documents-button" onClick={() => handleRequestDocuments()}>
           <img
            src={docuIcon}
            alt="Enroll Icon"
            style={{ marginBottom: '8px', width: '120px', height: '120px' }}
          />
         <div style={{ fontSize: '24px', fontWeight: 'bold' }}>Request Documents</div>
      </button>
    </div>

    </>
  );
};

export default Home;