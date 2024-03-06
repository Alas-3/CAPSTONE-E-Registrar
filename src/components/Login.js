import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../components/styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onContinue = async (e) => {
    e.preventDefault();

    try {
       console.log('Continue button clicked');
      // Save the user's full name to Firestore
      const userRef = collection(db, 'users');
      const docRef = await addDoc(userRef, {
        fullName: fullName,
      });

      // Navigate to the next page (you can replace '/home' with your desired path)
      navigate('/home');
    } catch (error) {
      console.error('Error creating account:', error);
      setErrorMessage('Error creating account');
    }
  };

  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="content">
            <form>
              <div className="field">
                <label htmlFor="full-name">Full Name</label>
                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Full Name"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button className='loginbutton' onClick={onContinue}>Continue</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
