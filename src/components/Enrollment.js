import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit, doc, setDoc, getDoc } from 'firebase/firestore';
import './styles/Enrollment.css';

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const [studentNumber, setStudentNumber] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [program, setProgram] = useState('');

  // Fetch the latest ticket number from a separate collection
  const fetchLatestTicketNumber = async () => {
    try {
      const ticketNumberRef = doc(db, 'ticketNumber', 'latest');
      const ticketNumberSnapshot = await getDoc(ticketNumberRef);

      if (ticketNumberSnapshot.exists()) {
        return ticketNumberSnapshot.data().number;
      }

      // If the document doesn't exist, return 0 as the default
      return 0;
    } catch (error) {
      console.error('Error fetching latest ticket number:', error);
      throw error;
    }
  };

  // Increment and update the ticket number in the separate collection
  const incrementTicketNumber = async () => {
    try {
      const latestTicketNumber = await fetchLatestTicketNumber();
      const newTicketNumber = latestTicketNumber + 1;

      // Update the ticket number in the 'ticketNumber' collection
      const ticketNumberRef = doc(db, 'ticketNumber', 'latest');
      await setDoc(ticketNumberRef, { number: newTicketNumber });

      return newTicketNumber;
    } catch (error) {
      console.error('Error incrementing ticket number:', error);
      throw error;
    }
  };

  const handleContinue = async () => {
    try {
      // Fetch the latest ticket number
      const ticketNumber = await incrementTicketNumber();

      // Simple form validation
      if (!studentNumber || !yearLevel || !semester || !section || !program) {
        alert('Please fill in all fields.');
        return;
      }

      // More specific validation for Student Number
      const studentNumberRegex = /^[0-9]+$/;
      if (!studentNumber.match(studentNumberRegex)) {
        alert('Please enter a valid Student Number.');
        return;
      }

      // Validate student number length
      if (studentNumber.length !== 11) {
        alert('Invalid student number. Must be 11 digits.');
        return;
      }

      // Save the enrollment data with the incremented ticket number
      const enrollmentDataRef = collection(db, 'enrollmentData');
      const enrollmentData = {
        studentNumber,
        yearLevel,
        semester,
        section,
        program,
        ticketNumber,
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
        <label htmlFor="studentNumber">Student Number:<span style={{ fontSize: '0.8em', opacity: 0.6, marginLeft: '5px' }}>(ex. 01201234567)</span></label>
        <input
          type="text"
          id="studentNumber"
          value={studentNumber}
          onChange={(e) => {
            const input = e.target.value;
            const regex = /^[0-9]*$/; // Only allow numbers
            const maxLength = 11; // Maximum length allowed

            // Check if the input matches the regex pattern and the length is not greater than maxLength
            if (input.match(regex) && input.length <= maxLength) {
              setStudentNumber(input); // Update student number state
            } else {
              // If the input doesn't meet the conditions, don't update the state
              // and show an alert only when the length exceeds maxLength
              if (input.length > maxLength) {
                alert('Student Number must be exactly 11 digits.');
              }
            }
          }}
          autoComplete="off"
        />

        <label htmlFor="program">Program:</label>
        <select
          id="program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        >
          <option value="" disabled selected hidden>Select a Program</option>
          <option value="BEE - Bachelor of Elementary Education">BEE - Bachelor of Elementary Education</option>
          <option value="BEE_INT - Bachelor of Elementary Education (International)">BEE_INT - Bachelor of Elementary Education (International)</option>
          <option value="BFS - Bachelor in Forensic Science">BFS - Bachelor in Forensic Science</option>
          <option value="BS BIO_INDIAN - Bachelor of Science in Biology (Indian)">BS BIO_INDIAN - Bachelor of Science in Biology (Indian)</option>
          <option value="BS BIO_INT - Bachelor of Science in Biology (International)">BS BIO_INT - Bachelor of Science in Biology (International)</option>
          <option value="BS PSYCH - Bachelor of Science in Psychology">BS PSYCH - Bachelor of Science in Psychology</option>
          <option value="BSA - Bachelor of Science in Accountancy">BSA - Bachelor of Science in Accountancy</option>
          <option value="BSAIS - Bachelor of Science in Accounting Information System">BSAIS - Bachelor of Science in Accounting Information System</option>
          <option value="BSAT - Bachelor of Science in Accounting Technology">BSAT - Bachelor of Science in Accounting Technology</option>
          <option value="BSBIO - Bachelor of Science in Biology">BSBIO - Bachelor of Science in Biology</option>
          <option value="BSCMBK - Bachelor of Science in Business Administration Maj in Banking">BSCMBK - Bachelor of Science in Business Administration Maj in Banking</option>
          <option value="BSCMM - Bachelor of Science in Business Administration Maj in Marketing Mgt">BSCMM - Bachelor of Science in Business Administration Maj in Marketing Mgt</option>
          <option value="BSCS - Bachelor of Science in Computer Science">BSCS - Bachelor of Science in Computer Science</option>
          <option value="BSCS_INT - Bachelor of Science in Computer Science (International)">BSCS_INT - Bachelor of Science in Computer Science (International)</option>
          <option value="BSEE_INT - Bachelor of Secondary Education Major in English (International)">BSEE_INT - Bachelor of Secondary Education Major in English (International)</option>
          <option value="BSEEC - Bachelor of Elem Educ Maj in Early Childhood Education">BSEEC - Bachelor of Elem Educ Maj in Early Childhood Education</option>
          <option value="BSEMC - Bachelor of Science in Entertainment and Multi Media Computing">BSEMC - Bachelor of Science in Entertainment and Multi Media Computing</option>
          <option value="BSHRM - Bachelor of Science in Hotel and Restaurant Management">BSHRM - Bachelor of Science in Hotel and Restaurant Management</option>
          <option value="BSHRMCF - B.S. Hotel & Restaurant Management Culinary & Food Service">BSHRMCF - B.S. Hotel & Restaurant Management Culinary & Food Service</option>
          <option value="BSHRMCL - B.S. Hotel & Restaurant Management Cruise Line">BSHRMCL - B.S. Hotel & Restaurant Management Cruise Line</option>
          <option value="BSIHM - Bachelor of Science in International Hospitality Management">BSIHM - Bachelor of Science in International Hospitality Management</option>
          <option value="BSIT - Bachelor of Science in Information Technology">BSIT - Bachelor of Science in Information Technology</option>
          <option value="BSITM - Bachelor of Science in International Tourism Management">BSITM - Bachelor of Science in International Tourism Management</option>
          <option value="BSMarE - Bachelor of Science in Marine Engineering">BSMarE - Bachelor of Science in Marine Engineering</option>
          <option value="BSN - Bachelor of Science in Nursing">BSN - Bachelor of Science in Nursing</option>
          <option value="BSPHARM - Bachelor of Science in Pharmacy">BSPHARM - Bachelor of Science in Pharmacy</option>
          <option value="BSPHARMA_INT - Bachelor of Science in Pharmacy (International)">BSPHARMA_INT - Bachelor of Science in Pharmacy (International)</option>
          <option value="BSPSY_INT - Bachelor of Science in Psychology (International)">BSPSY_INT - Bachelor of Science in Psychology (International)</option>
          <option value="BSPT - Bachelor of Science in Physical Therapy">BSPT - Bachelor of Science in Physical Therapy</option>
          <option value="BSRADTECH - Bachelor of Science in Radiologic Technology">BSRADTECH - Bachelor of Science in Radiologic Technology</option>
          <option value="BSRT - Bachelor of Science in Respiratory Therapy">BSRT - Bachelor of Science in Respiratory Therapy</option>
          <option value="BSSE - Bachelor of Secondary Education Major In English">BSSE - Bachelor of Secondary Education Major In English</option>
          <option value="BSTM - Bachelor of Science in Travel Management">BSTM - Bachelor of Science in Travel Management</option>
          <option value="CCN - Commercial Cooking Nc Ii (436 Hours)">CCN - Commercial Cooking Nc Ii (436 Hours)</option>
          <option value="DMD - Doctor of Dentistry">DMD - Doctor of Dentistry</option>
          <option value="DMD_INT - Doctor of Dentistry (International)">DMD_INT - Doctor of Dentistry (International)</option>
          <option value="DPA - Doctor of Public Administration">DPA - Doctor of Public Administration</option>
          <option value="DrPH - Doctor in Public Health with Specialization in Health Management">DrPH - Doctor in Public Health with Specialization in Health Management</option>
          <option value="EdD CI - Doctor of Education Major in Curriculum and Instruction">EdD CI - Doctor of Education Major in Curriculum and Instruction</option>
          <option value="EDDE - Doctor of Education Major in Educational Management">EDDE - Doctor of Education Major in Educational Management</option>
          <option value="GS - Grade School">GS - Grade School</option>
          <option value="JHS - JUNIOR HIGH SCHOOL">JHS - JUNIOR HIGH SCHOOL</option>
          <option value="KIN - Kindergarten">KIN - Kindergarten</option>
          <option value="KINDER - KINDERGARTEN">KINDER - KINDERGARTEN</option>
          <option value="MD - Doctor of Medicine">MD - Doctor of Medicine</option>
          <option value="MEDTECH - Bachelor of Science in Medical Laboratory Science">MEDTECH - Bachelor of Science in Medical Laboratory Science</option>
          <option value="ND - Bachelor of Science in Nutrition & Dietetics">ND - Bachelor of Science in Nutrition & Dietetics</option>
          <option value="NUR - NURSERY">NUR - NURSERY</option>
          <option value="SHS-ABM - Academic Track/ Accountancy, Business and Management (ABM)">SHS-ABM - Academic Track/ Accountancy, Business and Management (ABM)</option>
          <option value="SHS-GAS - Academic Track/ General Academic (GAS)">SHS-GAS - Academic Track/ General Academic (GAS)</option>
          <option value="SHS-HUMSS - Academic Track/ Humanities and Social Sciences (HUMSS)">SHS-HUMSS - Academic Track/ Humanities and Social Sciences (HUMSS)</option>
          <option value="SHS-STEM - Academic Track/ Science, Technology, Engineering, and Mathematics (STEM)">SHS-STEM - Academic Track/ Science, Technology, Engineering, and Mathematics (STEM)</option>
        </select>

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

        <label htmlFor="section">Preferred Section:<span style={{ fontSize: '0.8em', opacity: 0.6, marginLeft: '5px' }}>(ex. 1 or 12)</span></label>
        <input
          type="text"
          id="section"
          value={section}
          onChange={(e) => {
            const input = e.target.value;
            const regex = /^[0-9]*$/; // Only allow numbers
            const maxLength = 2; // Maximum length allowed

            // Check if the input matches the regex pattern and the length is not greater than maxLength
            if (input.match(regex) && input.length <= maxLength) {
              setSection(input); // Update section state
            } else {
              // If the input doesn't meet the conditions, don't update the state
              // and show an alert only when the length exceeds maxLength
              if (input.length > maxLength) {
                alert('Preferred section must be 1 or 2 digits only.');
              }
            }
          }}
          autoComplete="off"
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