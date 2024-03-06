// DocumentsRequestForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import './styles/docureq.css';

const DocumentsRequestForm = () => {
  const navigate = useNavigate();

  const [studentNumber, setStudentNumber] = useState('');
  const [yearLevel, setYearLevel] = useState('First Year');
  const [program, setProgram] = useState('');
  const [documentToRequest, setDocumentToRequest] = useState('');

  const generateTicketNumber = async () => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    try {
      // Query Firestore to get the count of documents submitted on the current day
      const documentsRef = collection(db, 'documentsRequest');
      const q = query(documentsRef, where('timestamp', '>=', startOfDay));
      const querySnapshot = await getDocs(q);

      // Calculate the new ticket number
      const ticketNumber = querySnapshot.size + 1;

      return ticketNumber;
    } catch (error) {
      console.error('Error generating ticket number:', error);
      return null;
    }
  };

  const handleContinue = async () => {
    if (!studentNumber || !yearLevel || !program || !documentToRequest) {
      alert('Please fill in all fields before continuing.');
      return;
    }

    const studentNumberRegex = /^[\d-]+$/;
    if (!studentNumberRegex.test(studentNumber)) {
      alert('Invalid student number. Please use only digits and hyphen (-).');
      return;
    }

    try {
      const ticketNumber = await generateTicketNumber();
      if (ticketNumber === null) {
        alert('Error generating ticket number. Please try again.');
        return;
      }

      const documentsRequestRef = collection(db, 'documentsRequest');

      const requestData = {
        studentNumber,
        yearLevel,
        program,
        documentToRequest,
        timestamp: serverTimestamp(),
        ticketNumber,
      };

      const docRef = await addDoc(documentsRequestRef, requestData);

      navigate(`/display-data-dr?docId=${docRef.id}`);
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  const handleBack = () => {
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